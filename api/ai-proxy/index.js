const GEMINI_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { image } = req.body || {};
  if (!image) { res.status(400).json({ error: 'No image provided' }); return; }
  if (!GEMINI_KEY) { res.status(500).json({ error: 'GEMINI_API_KEY not set' }); return; }

  const promptLang = 'Диетолог. Определи ВСЮ еду на фото и оцени КАЛОРИИ ДЛЯ ВСЕЙ ПОРЦИИ. JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Если видишь еду — никогда не пиши 0, всегда давай оценку.';

  const requestBody = {
    contents: [{ parts: [
      { text: promptLang },
      { inlineData: { mimeType: 'image/jpeg', data: image } }
    ]}]
  };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text();
    let parsed = null;
    try { parsed = JSON.parse(text); } catch {}

    if (parsed?.error) {
      return res.status(200).json({ 
        error: parsed.error.message || 'Google API error',
        debug: { status: response.status }
      });
    }

    const aiText = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!aiText) {
      return res.status(200).json({ error: 'EMPTY_RESPONSE', raw: text.slice(0, 100) });
    }

    let cleanText = aiText.trim();
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
    }

    let json = null;
    try { json = JSON.parse(cleanText); } catch {}
    if (!json) {
      const s = cleanText.indexOf('{');
      const e = cleanText.lastIndexOf('}');
      if (s !== -1 && e !== -1) {
        try { json = JSON.parse(cleanText.slice(s, e + 1)); } catch {}
      }
    }

    if (!json || (!json.calories && !json.protein && !json.carbs)) {
      return res.status(200).json({ error: 'PARSE_FAILED', text: aiText.slice(0, 200) });
    }

    return res.status(200).json({
      meal: String(json.meal || json.product_name || json.name || 'Food'),
      calories: Number(json.calories || json.calories_estimated || json.kcal || 0),
      protein: Number(json.protein || 0),
      carbs: Number(json.carbs || 0),
      fats: Number(json.fats || 0),
      fiber: Number(json.fiber || 0),
    });
  } catch (err) {
    return res.status(200).json({ error: err.message || 'Unknown error' });
  }
}