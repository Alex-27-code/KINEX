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
    const apiRes = await fetch('/api/gemini-analyze', {
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

  // --- STEP 1: Gemini SDK fallback ---
  const lang = String(locale || 'en').toLowerCase().slice(0, 2);

  const langInstructions: Record<string, string> = {
    ru: 'Отвечай на РУССКОМ языке.',
    de: 'Antworte auf DEUTSCH.',
    es: 'Responde en ESPAÑOL.',
    en: 'Respond in ENGLISH.',
  };
  const li = langInstructions[lang] || langInstructions.en;

  // Standard portion sizes (in grams) for common foods — RETURN VALUES FOR THE WHOLE PORTION
  const promptsByLang: Record<string, string> = {
    ru: userContext
      ? `Пользователь хочет скорректировать: "${userContext}". ${li} Верни JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ВСЕГДА возвращай калории и БЖУ ДЛЯ ВСЕЙ ПОДАЧИ (целой порции), а не на 100г. Примеры порций: куриная грудка 200-300г (~160ккал), рис 200-300г (~260ккал), пельмени 250-400г (~520ккал), оливье 300г (~380ккал), супы 400-600мл (~300ккал), вторые блюда 300-500г.`
      : `${li} Профессиональный диетолог. ВСЕГДА возвращай калории и БЖУ ДЛЯ ВСЕЙ ПОДАЧИ (целой порции на фото), а не на 100г. JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Если НЕ еда (интерфейс приложения) - {"meal":""}. Примеры целых порций: куриная грудка 200-300г (130-195ккал, 26-39г белка), рис 200-300г (260-390ккал), пельмени/вареники 300г (~520ккал, 22г белка), оливье 300г (~380ккал), супы 400мл (~200-350ккал), салаты 300г (~250ккал). Оценивай размер порции на глаз и возвращай значения для ВСЕЙ порции.`,
    de: userContext
      ? `Korrigieren: "${userContext}". ${li} JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Ganzes Portion, nicht pro 100g.`
      : `${li} Ernährungsberater. JSON: {"meal":"Gericht","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Ganzes Portion auf dem Foto, nicht pro 100g.`,
    es: userContext
      ? `Corregir: "${userContext}". ${li} JSON: {"meal":"nombre","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Porción completa, no por 100g.`
      : `${li} Nutricionista. JSON: {"meal":"plato","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Porción completa en la foto, no por 100g.`,
    en: userContext
      ? `Correct: "${userContext}". ${li} JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ALWAYS return values for the WHOLE PORTION shown, not per 100g. Examples: chicken breast 200-300g (~160kcal), rice 200-300g (~260kcal), pelmeni 300g (~520kcal).`
      : `${li} Nutritionist. JSON: {"meal":"food name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ALWAYS return values for the WHOLE PORTION in the photo, not per 100g. Estimate portion size and return values for the entire serving.`,
  };

  const prompt = promptsByLang[lang] || promptsByLang.en;

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  });

  const backoffs = [3000, 6000];
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await model.generateContent([
        prompt,
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
      ]);
      const text = result.response.text?.trim() || '';
      console.log(`[gemini.ts] Gemini attempt ${attempt} raw text:`, text.slice(0, 200));
      if (!text || text === 'null' || text === '{}') throw new Error('EMPTY_RESPONSE');

      let json: any = null;
      try { json = JSON.parse(text); } catch (_) {}
      if (!json) {
        const m = text.match(/\{[\s\S]*\}/);
        if (m) { try { json = JSON.parse(m[0]); } catch (_) {} }
      }

      if (json && (json.meal || json.calories != null)) {
        if (!json.meal || json.meal === '') throw new Error('BAD_PHOTO');
        return {
          meal: String(json.meal),
          calories: Number(json.calories) || 0,
          protein: Number(json.protein) || 0,
          carbs: Number(json.carbs) || 0,
          fats: Number(json.fats) || 0,
          fiber: Number(json.fiber) || 0,
          breakdown: String(json.breakdown || ''),
        };
      }
      throw new Error('PARSE_FAILED');
    } catch (e: any) {
      const msg = e?.message || String(e);
      console.warn(`[gemini.ts] Caught error: "${msg}" | attempt: ${attempt}`);
      const isRetriable = msg.includes('503') || msg.includes('429') || msg.includes('QUOTA') || msg.includes('UNAVAILABLE') || msg === 'EMPTY_RESPONSE' || msg === 'PARSE_FAILED';
      console.warn(`[gemini.ts] Gemini attempt ${attempt} failed: "${msg}" | retriable=${isRetriable}`);
      if (attempt < 1 && isRetriable) {
        console.warn(`[gemini.ts] Retrying in ${backoffs[attempt]}ms...`);
        await new Promise(r => setTimeout(r, backoffs[attempt]));
        continue;
      }
      if (msg === 'BAD_PHOTO') throw e;
      console.warn(`[gemini.ts] Gemini final failure, breaking.`);
      break;
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