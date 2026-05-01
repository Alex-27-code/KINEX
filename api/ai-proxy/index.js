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

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
    const requestBody = {
      contents: [{ parts: [
        { text: 'Отвечай на РУССКОМ языке. Диетолог. JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ВСЯ порция целиком (не на 100г). Если на фото еда — опиши её и посчитай калории для всего продукта. Никогда не пиши "unknown" или 0 калорий если видишь еду.' },
        { inlineData: { mimeType: 'image/jpeg', data: image } }
      ]}],
      // NOTE: NOT using responseMimeType — it forces 0 calories when model can't compute precisely
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text();
    let parsed = null;
    try { parsed = JSON.parse(text); } catch {}

    if (parsed?.error) {
      return res.status(200).json({ error: parsed.error.message || 'Google API error' });
    }

    const aiText = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!aiText) {
      return res.status(200).json({ error: 'EMPTY_RESPONSE' });
    }

    // Strip markdown code fences if present
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

    // Handle alternative field names (Gemini sometimes returns different schema)
    const meal = String(json?.meal || json?.product_name || json?.name || 'Food');
    const calories = Number(json?.calories || json?.calories_estimated || json?.kcal || 0);
    const protein = Number(json?.protein || 0);
    const carbs = Number(json?.carbs || 0);
    const fats = Number(json?.fats || 0);
    const fiber = Number(json?.fiber || 0);

    if (!json || (!calories && !protein && !carbs)) {
      return res.status(200).json({ error: 'PARSE_FAILED', text: aiText.slice(0, 150) });
    }

    return res.status(200).json({ meal, calories, protein, carbs, fats, fiber });
  } catch (err) {
    return res.status(200).json({ error: err.message || 'Unknown error' });
  }
}
