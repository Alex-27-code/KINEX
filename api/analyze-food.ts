import type { VercelRequest, VercelResponse } from '@vercel/node';

const API_KEY = 'AIzaSyCIFedcQdaQUV4B175MHS4V4XvqAoQ7fOc';
const MODEL = 'gemini-2.5-flash';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, context } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    const prompt = `You are a professional nutritionist. Analyze this food image and provide accurate nutritional information.
${context ? `User feedback: "${context}". Please reconsider.\n` : ''}
Return EXACTLY this JSON (no markdown, no code blocks):
{"meal":"food name","calories":250,"protein":20,"carbs":30,"fats":10,"fiber":5,"breakdown":"brief"}
Important: calories realistic for portion, all values in grams.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    
    const googleRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'image/jpeg', data: image } }] }],
      }),
    });

    if (!googleRes.ok) {
      const errBody = await googleRes.text();
      console.error('Google API error:', googleRes.status, errBody);
      return res.status(googleRes.status).json({ error: 'AI service unavailable', details: errBody });
    }

    const result = await googleRes.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Try to parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return res.status(200).json(data);
    }

    return res.status(200).json({ meal: 'Food', calories: 0, protein: 0, carbs: 0, fats: 0 });
  } catch (err: any) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: err.message });
  }
}
