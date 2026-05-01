const GEMINI_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { image } = req.body || {};
  if (!image) { res.status(400).json({ error: 'No image provided' }); return; }

  console.log('[ai-proxy] CALL. key present:', !!GEMINI_KEY, 'body keys:', Object.keys(req.body || {}));

  if (!GEMINI_KEY) {
    console.log('[ai-proxy] NO KEY!');
    return res.status(200).json({ error: 'GEMINI_API_KEY not set on server' });
  }

  try {
    const apiReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [
          { text: 'Return JSON: {"meal":"test","calories":123,"protein":10,"carbs":20,"fats":5,"fiber":3}.' },
          { inlineData: { mimeType: 'image/jpeg', data: image } }
        ]}],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
    console.log('[ai-proxy] Fetching:', apiUrl.slice(0, 70));

    const response = await fetch(apiUrl, apiReq);
    const raw = await response.text();
    console.log('[ai-proxy] Gemini responded. status:', response.status, 'raw len:', raw.length, 'raw:', raw.slice(0, 150));

    if (!raw || raw === 'null') {
      return res.status(200).json({ error: 'EMPTY_RESPONSE' });
    }

    let parsed;
    try { parsed = JSON.parse(raw); } catch { parsed = {}; }

    const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('[ai-proxy] text:', text.slice(0, 100));

    if (!text) {
      return res.status(200).json({ error: 'EMPTY_RESPONSE' });
    }

    let json = null;
    try { json = JSON.parse(text); } catch {}
    if (!json) {
      const s = text.indexOf('{');
      const e = text.lastIndexOf('}');
      if (s !== -1 && e !== -1) {
        try { json = JSON.parse(text.slice(s, e + 1)); } catch {}
      }
    }

    if (!json) {
      return res.status(200).json({ error: 'PARSE_FAILED', raw: text.slice(0, 100) });
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
    console.error('[ai-proxy] ERROR:', err.message || err);
    return res.status(200).json({ error: err.message || 'Unknown error' });
  }
}
