import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCsaETBtEIflqkn_d8GSuYNrYM0gdLs6cE');

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
  // Try to find JSON in the response
  const patterns = [
    /```json\s*([\s\S]*?)\s*```/,
    /```\s*([\s\S]*?)\s*```/,
    /(\{[\s\S]*\})/,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch (_) {}
    }
  }
  
  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

function parseFoodLine(line: string): FoodAnalysis | null {
  const lower = line.toLowerCase();
  if (!lower.includes('calori')) return null;
  
  const result: FoodAnalysis = {
    meal: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };
  
  const lines = line.split('\n');
  for (const l of lines) {
    const lc = l.toLowerCase();
    
    // Meal name
    const mealMatch = l.match(/^[*\-•]?\s*(.+?)\s*[-:]/);
    if (mealMatch && !result.meal) result.meal = mealMatch[1].trim();
    
    // Calories
    const calMatch = l.match(/calories[:\s]*(\d+)/i) || l.match(/(\d+)\s*kcal/i);
    if (calMatch) result.calories = parseInt(calMatch[1]);
    
    // Protein
    const protMatch = l.match(/protein[:\s]*(\d+(?:\.\d+)?)/i) || l.match(/(\d+(?:\.\d+)?)\s*g\s*protein/i);
    if (protMatch) result.protein = parseFloat(protMatch[1]);
    
    // Carbs
    const carbMatch = l.match(/carb(?:ohydrate)?s?[:\s]*(\d+(?:\.\d+)?)/i) || l.match(/(\d+(?:\.\d+)?)\s*g\s*carb/i);
    if (carbMatch) result.carbs = parseFloat(carbMatch[1]);
    
    // Fats
    const fatMatch = l.match(/fat[:\s]*(\d+(?:\.\d+)?)/i) || l.match(/(\d+(?:\.\d+)?)\s*g\s*fat/i);
    if (fatMatch) result.fats = parseFloat(fatMatch[1]);
    
    // Fiber
    const fibMatch = l.match(/fiber[:\s]*(\d+(?:\.\d+)?)/i);
    if (fibMatch) result.fiber = parseFloat(fibMatch[1]);
  }
  
  return result.calories > 0 ? result : null;
}

export async function analyzeFoodImage(
  base64Image: string,
  userContext?: string,
  _recentMeals?: any[],
  _learnedFoods?: any[]
): Promise<FoodAnalysis> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  const prompt = `You are a professional nutritionist. Analyze this food image and provide accurate nutritional information.

${userContext ? `User feedback on previous analysis: "${userContext}". Please reconsider with this in mind.\n` : ''}

Provide your response EXACTLY in this JSON format (no markdown, no code blocks, just the JSON):
{"meal":"food name","calories":250,"protein":20,"carbs":30,"fats":10,"fiber":5,"breakdown":"brief description"}

Important:
- Calories MUST be realistic for the portion shown
- Protein in grams
- Carbs in grams  
- Fats in grams
- Fiber in grams (optional)
- Include a brief breakdown explanation`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      },
    ]);

    const response = result.response;
    const text = response.text?.trim() || '';
    
    // Check for safety/feedback
    if (text.toLowerCase().includes('unable to determine') ||
        text.toLowerCase().includes('safety') ||
        text.toLowerCase().includes('harmful')) {
      throw new Error('Unable to analyze this image. Please try a clearer photo.');
    }
    
    // Try JSON parse
    const json = extractJSON(text);
    if (json && json.calories && json.meal) {
      return {
        meal: String(json.meal || 'Food'),
        calories: Number(json.calories) || 0,
        protein: Number(json.protein) || 0,
        carbs: Number(json.carbs) || 0,
        fats: Number(json.fats) || 0,
        fiber: Number(json.fiber) || 0,
        breakdown: String(json.breakdown || ''),
      };
    }
    
    // Fallback: parse as lines
    const lines = text.split('\n').filter(l => l.trim());
    for (const line of lines) {
      const parsed = parseFoodLine(line);
      if (parsed) return parsed;
    }
    
    throw new Error('Could not parse food data');
  } catch (error: any) {
    if (error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    throw error;
  }
}
