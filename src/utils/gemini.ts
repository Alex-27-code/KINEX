import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCIFedcQdaQUV4B175MHS4V4XvqAoQ7fOc';
const PROXY_URL = import.meta.env.VITE_AI_PROXY_URL || '/api';

const genAI = new GoogleGenerativeAI(API_KEY);

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
  const patterns = [
    /```json\s*([\s\S]*?)\s*```/,
    /```\s*([\s\S]*?)\s*```/,
    /(\{[\s\S]*\})/,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      try { return JSON.parse(match[1]); }
      catch (_) {}
    }
  }
  try { return JSON.parse(text); }
  catch (_) { return null; }
}

function friendlyError(error: any, isRu: boolean): string {
  const msg = error?.message || String(error) || '';
  
  if (msg.includes('403') || msg.includes('403 Forbidden') || msg.includes('location is not supported') || msg.includes('API_KEY_INVALID') || msg.includes('INVALID_ARGUMENT')) {
    return isRu 
      ? '⚠️ AI временно недоступен. Попробуйте через минуту.'
      : '⚠️ AI temporarily unavailable. Try again in a minute.';
  }
  if (msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')) {
    return isRu
      ? '⚠️ Превышен лимит запросов к AI. Попробуйте через минуту.'
      : '⚠️ AI request limit exceeded. Try again in a minute.';
  }
  if (msg.includes('Failed to fetch') || msg.includes('fetch') || msg.includes('network') || msg.includes('NetworkError') || msg.includes('NETWORK_ERROR')) {
    return isRu
      ? '🌐 Нет соединения с AI сервером. Проверьте интернет и попробуйте снова.'
      : '🌐 No connection to AI server. Check your internet and try again.';
  }
  if (msg.includes('unable to determine') || msg.includes('safety') || msg.includes('harmful') || msg.includes('blocked')) {
    return isRu
      ? '🚫 AI не смог распознать это блюдо. Попробуйте другое фото.'
      : '🚫 AI could not recognize this dish. Try a different photo.';
  }
  if (msg.includes('timeout') || msg.includes('TIMEOUT') || msg.includes('DEADLINE_EXCEEDED')) {
    return isRu
      ? '⏱️ AI слишком долго отвечает. Попробуйте ещё раз.'
      : '⏱️ AI took too long. Try again.';
  }
  if (msg.includes('parse') || msg.includes('Could not parse')) {
    return isRu
      ? '🤖 AI дал нечёткий ответ. Попробуйте ещё раз с другим фото.'
      : '🤖 AI gave unclear response. Try again with a different photo.';
  }
  return isRu
    ? '🤖 Что-то пошло не так с AI. Попробуйте ещё раз или опишите еду вручную.'
    : '🤖 Something went wrong with AI. Try again or log food manually.';
}

export async function analyzeFoodImage(
  base64Image: string,
  userContext?: string
): Promise<FoodAnalysis> {
  // Try proxy first (Vercel serverless in US — bypasses geo-block)
  if (PROXY_URL !== 'false') {
    try {
      const response = await fetch(`${PROXY_URL}/analyze-food`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image, context: userContext }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && (data.meal || data.calories)) {
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
      } else {
        const errText = await response.text();
        console.warn('Proxy error:', response.status, errText);
      }
    } catch (e) {
      console.warn('Proxy fetch failed, falling back to direct SDK:', e);
    }
  }

  // Fallback: direct SDK call (works from supported regions)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `You are a professional nutritionist. Analyze this food image and provide accurate nutritional information.
${userContext ? `User feedback: "${userContext}". Please reconsider.\n` : ''}
Return EXACTLY this JSON (no markdown, no code blocks):
{"meal":"food name","calories":250,"protein":20,"carbs":30,"fats":10,"fiber":5,"breakdown":"brief"}
Important: calories realistic for portion, all values in grams.`;

  try {
    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
    ]);

    const text = result.response.text?.trim() || '';
    if (text.toLowerCase().includes('unable') || text.toLowerCase().includes('safety') || text.toLowerCase().includes('blocked')) {
      throw new Error('BLOCKED_SAFETY');
    }

    const json = extractJSON(text);
    if (json && json.calories && json.meal) {
      return { meal: String(json.meal || 'Food'), calories: Number(json.calories) || 0, protein: Number(json.protein) || 0, carbs: Number(json.carbs) || 0, fats: Number(json.fats) || 0, fiber: Number(json.fiber) || 0, breakdown: String(json.breakdown || '') };
    }
    throw new Error('PARSE_FAILED');
  } catch (error: any) {
    const msg = error?.message || String(error);
    if (msg === 'BLOCKED_SAFETY' || msg === 'PARSE_FAILED') throw new Error(msg);
    throw new Error(`AI_ERROR:${msg.slice(0, 200)}`);
  }
}

export function parseAIError(error: any, isRu: boolean): string {
  const msg = String(error?.message || error || '');
  if (msg.startsWith('AI_ERROR:')) return friendlyError({ message: msg.slice(9) }, isRu);
  return friendlyError(error, isRu);
}
