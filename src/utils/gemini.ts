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
  if (msg.includes('403') || msg.includes('location is not supported')) {
    return isRu ? '⚠️ AI временно недоступен. Попробуйте через минуту.' : '⚠️ AI temporarily unavailable. Try again in a minute.';
  }
  if (msg.includes('quota') || msg.includes('429')) {
    return isRu ? '⚠️ Превышен лимит запросов. Попробуйте через минуту.' : '⚠️ AI request limit exceeded. Try again in a minute.';
  }
  if (msg.includes('Failed to fetch') || msg.includes('network')) {
    return isRu ? '🌐 Нет соединения. Проверьте интернет.' : '🌐 No connection. Check your internet.';
  }
  return isRu ? '🤖 Что-то пошло не так. Попробуйте ещё раз.' : '🤖 Something went wrong. Try again.';
}

export async function analyzeFoodImage(base64Image: string, userContext?: string): Promise<FoodAnalysis> {
  // Helper to build result
  const ok = (data: any): FoodAnalysis => ({
    meal: String(data.meal || 'Food'),
    calories: Number(data.calories) || 0,
    protein: Number(data.protein) || 0,
    carbs: Number(data.carbs) || 0,
    fats: Number(data.fats) || 0,
    fiber: Number(data.fiber) || 0,
    breakdown: String(data.breakdown || ''),
  });

  try {
    const response = await fetch(PROXY_URL + '/analyze-food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image, context: userContext }),
    });
    if (response.ok) {
      const data = await response.json();
      // Return even if calories=0 or meal=unknown — never throw
      if (data && (data.meal || data.calories || data.protein || data.carbs || data.fats)) {
        return ok(data);
      }
      // If only error field present (e.g. {error: "No response from AI"}), fall through to Gemini
    }
  } catch (e) {
    console.warn('Proxy failed:', e);
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = 'You are a professional nutritionist. Analyze this food image and provide accurate nutritional information. Return EXACTLY this JSON: {"meal":"food name","calories":250,"protein":20,"carbs":30,"fats":10,"fiber":5,"breakdown":"brief"}';

  try {
    const result = await model.generateContent([prompt, { inlineData: { mimeType: 'image/jpeg', data: base64Image } }]);
    const text = result.response.text?.trim() || '';
    if (!text) throw new Error('EMPTY_RESPONSE');
    const json = extractJSON(text);
    // Return whatever we got — even {meal:"unknown", calories:0} is a valid result
    if (json && (json.meal || json.calories != null)) {
      return { meal: String(json.meal || 'Food'), calories: Number(json.calories) || 0, protein: Number(json.protein)||0, carbs: Number(json.carbs)||0, fats: Number(json.fats)||0, fiber: Number(json.fiber)||0, breakdown: String(json.breakdown||'') };
    }
    throw new Error('PARSE_FAILED');
  } catch (error: any) {
    const msg = error?.message || String(error);
    if (['PARSE_FAILED','EMPTY_RESPONSE'].includes(msg)) return { meal: 'Food', calories: 0, protein: 0, carbs: 0, fats: 0 };
    throw new Error('AI_ERROR:' + msg.slice(0, 200));
  }
}

export function parseAIError(error: any, isRu: boolean): string {
  return friendlyError(String(error?.message || error || ''), isRu);
}
