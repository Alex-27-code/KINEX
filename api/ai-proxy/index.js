const GEMINI_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { image } = req.body || {};
  if (!image) { res.status(400).json({ error: 'No image provided' }); return; }

  if (!GEMINI_KEY) {
    return res.status(200).json({ error: 'GEMINI_API_KEY not set' });
  }

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
    
    const apiReqBody = {
      contents: [{ parts: [
        { text: 'Return JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Whole portion.' },
        { inlineData: { mimeType: 'image/jpeg', data: image } }
      ]}],
    };

    console.log('[ai-proxy] Making fetch to:', apiUrl.slice(0, 80));
    console.log('[ai-proxy] Request body keys:', JSON.stringify(apiReqBody).slice(0, 100));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiReqBody),
    });

    console.log('[ai-proxy] Response status:', response.status);
    console.log('[ai-proxy] Response ok:', response.ok);
    console.log('[ai-proxy] Response headers content-type:', response.headers.get('content-type'));
    console.log('[ai-proxy] Response body type:', typeof response.body);

    const raw = await response.text();
    console.log('[ai-proxy] Raw response (first 200):', raw.slice(0, 200));
    console.log('[ai-proxy] Raw response length:', raw.length);

    if (!raw || raw === 'null') {
      return res.status(200).json({ error: 'EMPTY_RESPONSE' });
    }

    let parsed;
    try { parsed = JSON.parse(raw); } catch { parsed = {}; }

    const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('[ai-proxy] Extracted text (first 100):', text.slice(0, 100));

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
      return res.status(200).json({ error: 'PARSE_FAILED', text: text.slice(0, 100) });
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
    console.error('[ai-proxy] FATAL ERROR:', err.message || err);
    return res.status(200).json({ error: 'FETCH_FAILED: ' + (err.message || 'Unknown') });
  }
}
