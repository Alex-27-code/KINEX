import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export interface FoodAnalysis {
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  breakdown?: string;
}

const KNOWN_FOODS = [
  { keys: ['pelmeni', 'dumpling', 'vareniki', 'manti'], cals: 520, p: 22, c: 52, f: 22, fib: 2 },
  { keys: ['oreos', 'oreo', 'cookie'], cals: 320, p: 2, c: 50, f: 16, fib: 2 },
  { keys: ['banana'], cals: 105, p: 1, c: 27, f: 0, fib: 3 },
  { keys: ['milk'], cals: 150, p: 8, c: 12, f: 8, fib: 0 },
  { keys: ['pasta', 'penne', 'spaghetti', 'macaroni', 'noodle'], cals: 550, p: 22, c: 70, f: 18, fib: 3 },
  { keys: ['rice'], cals: 200, p: 4, c: 45, f: 0, fib: 1 },
  { keys: ['chicken', 'turkey', 'meat', 'beef', 'pork', 'ground meat'], cals: 250, p: 30, c: 0, f: 14, fib: 0 },
  { keys: ['salad', 'cucumber', 'lettuce', 'vegetable'], cals: 80, p: 3, c: 12, f: 0, fib: 4 },
  { keys: ['olivye', 'olivier', 'russian salad', 'potato salad'], cals: 380, p: 10, c: 28, f: 25, fib: 3 },
  { keys: ['bread', 'toast', 'sandwich'], cals: 200, p: 7, c: 38, f: 3, fib: 2 },
  { keys: ['pizza'], cals: 300, p: 12, c: 35, f: 12, fib: 2 },
  { keys: ['burger', 'hamburger'], cals: 500, p: 25, c: 40, f: 25, fib: 2 },
  { keys: ['fries', 'french fries'], cals: 400, p: 5, c: 50, f: 20, fib: 4 },
  { keys: ['soup', 'borscht', 'shchi', 'solyanka'], cals: 300, p: 10, c: 35, f: 12, fib: 3 },
  { keys: ['coffee', 'latte', 'cappuccino'], cals: 100, p: 5, c: 10, f: 3, fib: 0 },
  { keys: ['tea'], cals: 5, p: 0, c: 1, f: 0, fib: 0 },
  { keys: ['water'], cals: 0, p: 0, c: 0, f: 0, fib: 0 },
  { keys: ['apple'], cals: 95, p: 0, c: 25, f: 0, fib: 4 },
  { keys: ['egg'], cals: 70, p: 6, c: 0, f: 5, fib: 0 },
  { keys: ['porridge', 'oatmeal', 'oats', 'kasha'], cals: 300, p: 10, c: 50, f: 6, fib: 5 },
  { keys: ['kebab', 'shawarma', 'doner'], cals: 600, p: 30, c: 40, f: 35, fib: 2 },
  { keys: ['salo'], cals: 350, p: 3, c: 0, f: 38, fib: 0 },
  { keys: ['bliny', 'pancake', 'syrniki'], cals: 280, p: 12, c: 35, f: 10, fib: 2 },
  { keys: ['okroshka'], cals: 250, p: 12, c: 28, f: 10, fib: 3 },
];

function lookupFood(name: string) {
  if (!name) return null;
  const lower = name.toLowerCase();
  for (const f of KNOWN_FOODS) {
    if (f.keys.some(k => lower.includes(k))) return f;
  }
  return null;
}

function processResult(data: any): FoodAnalysis {
  let { meal, calories, protein, carbs, fats, fiber } = data || {};
  meal = String(meal || 'Food').trim();
  calories = Number(calories) || 0;
  protein = Number(protein) || 0;
  carbs = Number(carbs) || 0;
  fats = Number(fats) || 0;
  fiber = Number(fiber) || 0;

  const calcCals = Math.round(protein * 4 + carbs * 4 + fats * 9);

  // --- Per-100g auto-detection and scaling ---
  // Known per-100g calorie values for common foods
  const per100gCals: Record<string, number> = {
    'chicken': 72, 'куриц': 72, 'грудк': 72,
    'rice': 130, 'рис': 130,
    'beef': 250, 'говядин': 250, 'свинин': 260,
    'salmon': 208, 'лосос': 208,
    'tuna': 132, 'тунец': 132,
    'egg': 155, 'яйц': 155,
    'pasta': 157, 'паст': 157,
    'milk': 61, 'молоко': 61,
    'banana': 105, 'банан': 105,
    'apple': 52, 'яблок': 52,
    'bread': 265, 'хлеб': 265,
    'porridge': 68, 'каша': 68,
    'shwarm': 290, 'шаурма': 290,
  };

  // Detect if model returned per-100g by comparing to known values
  let scaled = false;
  if (calories > 0) {
    for (const [key, per100] of Object.entries(per100gCals)) {
      if (meal.toLowerCase().includes(key)) {
        // If returned cals ≈ known per-100g value (within 40%) → it's per-100g
        if (per100 > 0 && Math.abs(calories - per100) / per100 < 0.40) {
          const portionGrams: Record<string, number> = {
            'chicken': 250, 'куриц': 250, 'грудк': 250,
            'rice': 300, 'рис': 300,
            'beef': 250, 'говядин': 250, 'свинин': 250,
            'salmon': 200, 'лосос': 200,
            'tuna': 150, 'тунец': 150,
            'egg': 100, 'яйц': 100,
            'pasta': 300, 'паст': 300,
            'milk': 250, 'молоко': 250,
            'banana': 120, 'банан': 120,
            'apple': 180, 'яблок': 180,
            'bread': 100, 'хлеб': 100,
            'porridge': 300, 'каша': 300,
            'shwarm': 300, 'шаурма': 300,
          };
          const grams = portionGrams[key] || 250;
          const scale = grams / 100;
          calories = Math.round(calories * scale);
          protein = Math.round(protein * scale);
          carbs = Math.round(carbs * scale);
          fats = Math.round(fats * scale);
          fiber = Math.round((fiber || 0) * scale);
          scaled = true;
        }
        break;
      }
    }
  }

  // If meal is generic — try database lookup
  const genericMeals = ['food', 'meal', 'mixed', 'unknown', 'mixed meal', 'dish', 'блюдо'];
  const isGeneric = genericMeals.includes(meal.toLowerCase());

  if (isGeneric) {
    const known = lookupFood(meal);
    if (known) {
      ({ calories, protein, carbs, fats, fiber } = known);
    } else {
      calories = 450; protein = 18; carbs = 48; fats = 18; fiber = 4;
    }
  } else if (!scaled && (calories === 0 || calcCals === 0) && meal && meal.length > 1 && meal.length < 100) {
    const known = lookupFood(meal);
    if (known) {
      ({ calories, protein, carbs, fats, fiber } = known);
    } else if (calories === 0) {
      calories = 450; protein = 18; carbs = 48; fats = 18; fiber = 4;
    }
  } else if (calcCals > 0 && calories === 0) {
    calories = calcCals;
  } else if (calories > 0 && calcCals > 0 && !scaled) {
    const diff = Math.abs(calcCals - calories) / Math.max(calories, 1);
    if (diff > 0.20) calories = calcCals;
  }

  return { meal, calories, protein, carbs, fats, fiber, breakdown: '' };
}

function isRetriableError(errMsg: string): boolean {
  return errMsg.includes('503') || errMsg.includes('429') || errMsg.includes('UNAVAILABLE')
    || errMsg.includes('high demand') || errMsg.includes('timeout') || errMsg.includes('TIMEOUT')
    || errMsg.includes('rate limit') || errMsg.includes('quota');
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 50000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

export async function analyzeFoodImage(
  base64Image: string,
  userContext?: string,
  locale?: string
): Promise<FoodAnalysis> {
  // --- STEP 0: Try server-side API first (bypasses VPN blocks on client) ---
  try {
    const apiRes = await fetch('/api/ai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image, context: userContext, locale }),
    });
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && (data.meal || data.calories != null)) {
        return {
          meal: String(data.meal || 'Food'),
          calories: Number(data.calories) || 0,
          protein: Number(data.protein) || 0,
          carbs: Number(data.carbs) || 0,
          fats: Number(data.fats) || 0,
          fiber: Number(data.fiber) || 0,
          breakdown: String(data.breakdown || ''),
        };
      }
      if (data?.error) {
        console.warn('[gemini.ts] Server API error:', data.error);
      }
    }
  } catch (e: any) {
    console.warn('[gemini.ts] Server API call failed:', e?.message);
  }

  // --- STEP 1: OpenAI GPT-4o-mini fallback (client-side, VPN might not block OpenAI) ---
  const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  if (OPENAI_KEY) {
    try {
      const lang = String(locale || 'en').toLowerCase().slice(0, 2);
      const li = { ru: 'Отвечай на РУССКОМ языке.', de: 'Antworte auf DEUTSCH.', es: 'Responde en ESPAÑOL.', en: 'Respond in ENGLISH.' }[lang] || 'Respond in ENGLISH.';
      const sysPrompt = `Ты профессиональный диетолог. Определи ВСЕ продукты на фото и оцени пищевую ценность ВСЕЙ порции (целой тарелки). JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Если несколько продуктов — опиши ВСЕ. Всегда давай реальную оценку, никогда не говори "не могу".`;

      const oaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_KEY },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: lang === 'ru' ? sysPrompt : 'Professional nutritionist. Identify ALL foods in photo. Estimate nutritional values for the WHOLE PLATE. JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Always estimate, never say unable.' },
            { role: 'user', content: [
              { type: 'text', text: userContext ? `Корректировка: ${userContext}.` : 'Analyze this food photo. Identify ALL foods and estimate nutritional values for the whole portion.' },
              { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + base64Image, 'detail': 'high' } }
            ]},
          ],
          max_tokens: 350,
        }),
      });
      const oaiData = await oaiRes.json();
      const oaiText = oaiData?.choices?.[0]?.message?.content || '';
      if (oaiText) {
        let json: any = null;
        try { json = JSON.parse(oaiText); } catch (_) {}
        if (!json) { const m = oaiText.match(/\{[\s\S]*?\}/); if (m) try { json = JSON.parse(m[0]); } catch (_) {} }
        if (json && (json.meal || json.calories != null)) {
          console.log('[gemini.ts] OpenAI fallback succeeded:', json);
          return { meal: String(json.meal || 'Food'), calories: Number(json.calories)||0, protein: Number(json.protein)||0, carbs: Number(json.carbs)||0, fats: Number(json.fats)||0, fiber: Number(json.fiber)||0, breakdown: '' };
        }
      }
      console.warn('[gemini.ts] OpenAI fallback: no valid JSON');
    } catch (e: any) {
      console.warn('[gemini.ts] OpenAI fallback error:', e?.message);
    }
  }

  // --- STEP 2: Final fallback — use food database lookup ---
  if (userContext) {
    const known = lookupFood(userContext);
    if (known) return { meal: userContext, ...known, breakdown: '' };
  }
  return { meal: 'Food', calories: 450, protein: 18, carbs: 48, fats: 18, fiber: 4, breakdown: '' };
}
export function parseAIError(error: any, isRu: boolean): string {
  const msg = String(error?.message || error || '');
  if (msg.includes('aborted') || msg.includes('canceled')) {
    return isRu ? '⏱ Обработка заняла слишком долго. Попробуй ещё раз.' : '⏱ Took too long. Try again.';
  }
  if (msg.includes('BAD_PHOTO') || msg.includes('bad_photo')) {
    return isRu
      ? '📸 Это скриншот экрана, а не фото еды. Сфоткай саму еду!'
      : '📸 This is a screenshot, not a food photo. Take a photo of the actual food!';
  }
  if (msg.includes('quota') || msg.includes('429')) {
    return isRu ? '⚠️ Превышен лимит. Попробуй через минуту.' : '⚠️ Request limit. Try again in a minute.';
  }
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('Network')) {
    return isRu ? '🌐 Нет соединения. Проверь интернет.' : '🌐 No connection. Check internet.';
  }
  return isRu ? '🤖 Не удалось распознать. Попробуй ещё раз.' : '🤖 Could not identify food. Try again.';
}