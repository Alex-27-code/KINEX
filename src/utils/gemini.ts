// Google Gemini 2.5 Flash — Food Scanner
const GEMINI_API_KEY = "AIzaSyCsaETBtEIflqkn_d8GSuYNrYM0gdLs6cE";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Gemini API call with auto-retry
async function callGemini(prompt: string, base64Image: string, attempt = 0): Promise<any> {
    try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 45000);

        const parts: any[] = [{ text: prompt }];
        if (base64Image) {
            let raw = base64Image;
            if (raw.startsWith("data:image/")) raw = raw.split(",")[1] || raw;
            parts.push({ inline_data: { mime_type: "image/jpeg", data: raw } });
        }

        const res = await fetch(GEMINI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: ctrl.signal,
            body: JSON.stringify({
                contents: [{ parts }],
                generationConfig: {
                    temperature: 0.1,
                    topP: 0.5,
                    maxOutputTokens: 2048,
                    thinkingConfig: { thinkingBudget: 1024 }
                }
            })
        });
        clearTimeout(timer);

        const rawText = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result = JSON.parse(rawText);
        if (result.error) throw new Error(result.error.message);

        // With thinking enabled, response has multiple parts: thoughts + actual text
        // We need only the text part (not the thought part)
        let text = "";
        const partsOut = result.candidates?.[0]?.content?.parts || [];
        for (const p of partsOut) {
            if (p.text && !p.thought) text = p.text;
        }
        // Fallback: if no non-thought text found, take the last text part
        if (!text) {
            for (const p of partsOut) {
                if (p.text) text = p.text;
            }
        }

        const tokens = result.usageMetadata?.totalTokenCount || 0;
        console.log(`Gemini: ${tokens}tok | ${result.candidates?.[0]?.finishReason}`);

        if (!text.trim()) throw new Error("EMPTY");

        // Strip markdown code fences (```json ... ``` or ``` ... ```)
        let clean = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

        const s = clean.indexOf('{'), e = clean.lastIndexOf('}');
        if (s !== -1 && e > s) return JSON.parse(clean.substring(s, e + 1));
        return JSON.parse(clean);

    } catch (err: any) {
        if (attempt < 2) {
            console.log(`Retry ${attempt + 1}/2...`);
            await new Promise(r => setTimeout(r, 1000));
            return callGemini(prompt, base64Image, attempt + 1);
        }
        // User-friendly error messages
        if (err.name === 'AbortError' || err.message?.includes('Network request failed')) {
            throw new Error('Slow connection. Please check your internet and try again.');
        }
        throw err;
    }
}

export async function analyzeFoodImage(base64Image: string, userContext?: string, recentMeals?: any[], learnedFoods?: any[]) {
    try {
        console.log("Scanning food...");

        const history = recentMeals && recentMeals.length > 0
            ? `\nRECENT(copy exact values if visually identical):\n${recentMeals.slice(0, 10).map(m => `${m.name}:${m.calories}/${m.protein}p/${m.carbs}c/${m.fats}f`).join('; ')}`
            : '';

        const knownFoods = learnedFoods && learnedFoods.length > 0
            ? `\n\nPAST USER SCANS (Memory context for reference. ATTENTION: These are TOTAL values for the specific PORTION SIZE listed in the breakdown. You MUST adjust these values if the current photo has a DIFFERENT portion size or item count!):\n${learnedFoods.map(f => `• ${f.name} [Portion was: ${f.breakdown || (f.correction ? "from correction" : "unknown")}]: ${f.calories}cal, ${f.protein}p, ${f.carbs}c, ${f.fats}f${f.correction ? ` (User hint: ${f.correction})` : ''}`).join('\n')}`
            : '';

        const prompt = `You are a food nutrition calculator. Analyze the photo.

STEP 1 — IDENTIFY: Count every visible food item/package. Never add items you cannot see.
***CRITICAL RULE***: If the USER specifies exact weights or quantities (e.g. "100g", "Творог 3х120g"), YOU MUST OBEY THE USER EXACTLY instead of guessing from the photo!
STEP 2 — PER UNIT: For each unique food type, calculate nutrition for exactly ONE unit.
  - FIRST check "PAST USER scans". If you recognize the food, calculate the 1-unit value based on that past total and past portion size, then use it!
  - If a label is visible, read the weight and nutrition from it.
  - Otherwise use USDA values per 100g × estimated weight.
STEP 3 — MULTIPLY: For N identical items, multiply ONE unit values by N.
  Example: 1 cottage cheese = 120cal, 18g protein → 3 units = 360cal, 54g protein.
STEP 4 — SUM ALL TYPES: Add up results from all different food types.
  Example: 3 cottage cheese (360cal) + 1 candy bar (220cal) = 580cal total
STEP 5 — VERIFY: total calories ≈ protein×4 + carbs×4 + fats×9 (±10%).

All values must be exact integers (e.g. 487, not 500). When unsure, use the lower estimate.${knownFoods}${history}${userContext ? `\n\n=== USER OVERRIDE: YOU MUST OBEY EXACTLY ===\n"${userContext}"\n==========================================` : ''}

Think step by step, then respond with ONLY this JSON:
{"breakdown":"item1 Xg, item2 Yg","meal":"short name","calories":0,"protein":0,"carbs":0,"fats":0,"fiber":0}`;

        const d = await callGemini(prompt, base64Image);

        // Safety: force all fields to primitive types (Gemini sometimes returns objects)
        const mealName = typeof d.meal === 'string' ? d.meal : (typeof d.meal === 'object' ? Object.keys(d.meal).join(', ') : String(d.meal || "Unknown Food"));
        const breakdownText = typeof d.breakdown === 'string' ? d.breakdown : (typeof d.breakdown === 'object' ? JSON.stringify(d.breakdown) : String(d.breakdown || ""));

        console.log(`Result: ${mealName} | ${d.calories}cal`);

        return {
            meal: mealName,
            calories: Math.round(Number(d.calories)) || 0,
            protein: Math.round(Number(d.protein)) || 0,
            carbs: Math.round(Number(d.carbs)) || 0,
            fats: Math.round(Number(d.fats)) || 0,
            fiber: Math.round(Number(d.fiber)) || 0,
            breakdown: breakdownText
        };
    } catch (error: any) {
        console.error("Scan Error:", error.message);
        throw new Error(error.message || "Failed to analyze food.");
    }
}
