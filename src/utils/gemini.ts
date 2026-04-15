import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCyeuaOUopaUH6SkAn1b_zTEVc1lKnpFLs';
const PROXY_URL = '/api';

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

function extractJSON(text: string): any {
  const patterns = [/```json\s*([\s\S]*?)\s*```/, /\{([\s\S]*)\}/];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      try { return JSON.parse(match[1]); }
      catch (_) {}
    }
  }
  return null;
}

function friendlyError(msg: string, isRu: boolean): string {
  console.warn('[gemini.ts] parseAIError called with:', msg);
  if (msg.includes('BAD_PHOTO')) {
    return isRu
      ? '📸 Это скриншот экрана приложения, а не фото еды. Пожалуйста, сфоткайте саму еду — не экран приложения.'
      : '📸 This is a screenshot of the app screen, not a food photo. Please take a photo of the actual food, not the app screen.';
  }
  if (msg.includes('403') || msg.includes('location is not supported')) {
    return isRu ? '⚠️ AI временно недоступен. Попробуйте через минуту.' : '⚠️ AI temporarily unavailable. Try again in a minute.';
  }
  if (msg.includes('quota') || msg.includes('429')) {
    return isRu ? '⚠️ Превышен лимит запросов. Попробуйте через минуту.' : '⚠️ AI request limit exceeded. Try again in a minute.';
  }
  if (msg.includes('Failed to fetch') || msg.includes('network')) {
    return isRu ? '🌐 Нет соединения. Проверьте интернет.' : '🌐 No connection. Check your internet.';
  }
  return isRu ? '🤖 Что-то пошло не так. Попробуй ещё раз.' : '🤖 Something went wrong. Try again.';
}

export async function analyzeFoodImage(base64Image: string, userContext?: string, locale?: string): Promise<FoodAnalysis> {
  const lang = String(locale || 'en').toLowerCase().slice(0, 2);

  const langInstructions: Record<string, string> = {
    ru: 'Отвечай на РУССКОМ языке.',
    de: 'Antworte auf DEUTSCH.',
    es: 'Responde en ESPAÑOL.',
    en: 'Respond in ENGLISH.',
  };
  const li = langInstructions[lang] || langInstructions.en;

  const promptsByLang: Record<string, string> = {
    ru: userContext
      ? `Пользователь хочет скорректировать: "${userContext}". ${li} Верни JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Порции: пельмени 250-400г, оливье 300-500г, супы 400-600мл, вторые блюда 400-700г.`
      : `${li} Профессиональный диетолог. JSON: {"meal":"название","calories":0,"protein":0,"carbs":0,"fats":0,"fiber":0}. Если НЕ еда (интерфейс приложения) - {"meal":""}. Порции: пельмени/вареники 250-400г, оливье/салаты 300-500г, супы 400-600мл, вторые блюда 400-700г.`,
    de: userContext
      ? `Korrigieren: "${userContext}". ${li} JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}.`
      : `${li} Ernährungsberater. JSON: {"meal":"Gericht","calories":0,"protein":0,"carbs":0,"fats":0,"fiber":0}. Wenn App - {"meal":""}.`,
    es: userContext
      ? `Corregir: "${userContext}". ${li} JSON: {"meal":"nombre","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}.`
      : `${li} Nutricionista. JSON: {"meal":"plato","calories":0,"protein":0,"carbs":0,"fats":0,"fiber":0}. Si app - {"meal":""}.`,
    en: userContext
      ? `Correct: "${userContext}". ${li} JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}.`
      : `${li} Nutritionist. JSON: {"meal":"food name","calories":0,"protein":0,"carbs":0,"fats":0,"fiber":0}. If app UI - {"meal":""}. Portions: dumplings 250-400g, salads 300-500g.`,
  };

  const prompt = promptsByLang[lang] || promptsByLang.en;

  // --- STEP 1: Gemini primary (with retry + backoff) ---
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  });

  // Retry up to 4 times with backoff: 2s, 4s, 6s, 8s
  const backoffs = [2000, 4000, 6000, 8000];
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const result = await model.generateContent([
        prompt,
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
      ]);
      const text = result.response.text?.trim() || '';
      if (!text || text === 'null' || text === '{}') throw new Error('EMPTY_RESPONSE');

      let json = extractJSON(text);
      if (!json || (!json.meal && json.calories == null)) {
        try { json = JSON.parse(text); } catch (_) {} }
      if (json && (json.meal || json.calories != null)) {
        // Check for BAD_PHOTO
        if (!json.meal || json.meal === '') {
          throw new Error('BAD_PHOTO');
        }
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
      if (attempt < 3 && (msg.includes('503') || msg.includes('429') || msg.includes('QUOTA') || msg.includes('UNAVAILABLE') || msg === 'EMPTY_RESPONSE' || msg === 'PARSE_FAILED')) {
        console.warn(`[gemini.ts] Gemini attempt ${attempt} got "${msg}", retrying in ${backoffs[attempt]}ms...`);
        await new Promise(r => setTimeout(r, backoffs[attempt]));
        continue;
      }
      if (msg === 'BAD_PHOTO') {
        throw new Error('BAD_PHOTO');
      }
      if (attempt === 3) {
        console.warn(`[gemini.ts] All Gemini retries failed: ${msg}`);
      }
    }
  }

  // --- STEP 2: Gemini failed (all retries exhausted) → OpenAI fallback ---
  try {
    const response = await fetch(PROXY_URL + '/analyze-food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image, context: userContext, locale }),
    });
    const data = await response.json();
    if (data?.error === 'BAD_PHOTO') {
      throw new Error('BAD_PHOTO');
    }
    if (data && (data.meal || data.calories || data.protein || data.carbs || data.fats)) {
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
      console.warn('[gemini.ts] OpenAI fallback error:', data.error);
    }
  } catch (e: any) {
    if (e.message === 'BAD_PHOTO') throw e;
    console.warn('[gemini.ts] OpenAI fallback failed:', e.message);
  }

  return { meal: 'Food', calories: 0, protein: 0, carbs: 0, fats: 0 };
}

export function parseAIError(error: any, isRu: boolean): string {
  return friendlyError(String(error?.message || error || ''), isRu);
}
