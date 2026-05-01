// Using X-Goog-Api-Key header instead of query param (in case key isn't in query)
const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { image } = req.body || {};
  if (!image) { res.status(400).json({ error: 'No image provided' }); return; }
  if (!GEMINI_KEY) { res.status(500).json({ error: 'GEMINI_API_KEY not set' }); return; }

  try {
    const requestBody = {
      contents: [{ parts: [
        { text: 'Return JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Whole portion.' },
        { inlineData: { mimeType: 'image/jpeg', data: image } }
      ]}],
      generationConfig: { responseMimeType: 'application/json' },
    };

    // Try with X-Goog-Api-Key header AND query param
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GEMINI_KEY,
        },
        body: JSON.stringify(requestBody),
      }
    );

    const text = await response.text();
    let parsed = null;
    try { parsed = JSON.parse(text); } catch { /* raw text */ }

    if (parsed?.error) {
      return res.status(200).json({ googleError: parsed.error.code + ': ' + parsed.error.message, keyFound: GEMINI_KEY.slice(0, 5) + '...' });
    }

    const aiText = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!aiText) {
      return res.status(200).json({ error: 'EMPTY_RESPONSE' });
    }

    let json = null;
    try { json = JSON.parse(aiText); } catch {}
    if (!json) {
      const s = aiText.indexOf('{');
      const e = aiText.lastIndexOf('}');
      if (s !== -1 && e !== -1) {
        try { json = JSON.parse(aiText.slice(s, e + 1)); } catch {}
      }
    }

    if (!json) {
      return res.status(200).json({ error: 'PARSE_FAILED', text: aiText.slice(0, 100) });
    }

    return res.status(200).json({
      meal: String(json.meal || 'Food'),
      calories: Number(json.calories) || 0,
      protein: Number(json.protein) || 0,
      carbs: Number(json.carbs) || 0,
      fats: Number(json.fats) || 0,
      fiber: Number(json.fiber) || 0,
    });
  } catch (err) {
    return res.status(200).json({ error: err.message || 'Unknown error' });
  }
}
