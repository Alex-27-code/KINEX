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
        { text: 'Return JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Whole portion.' },
        { inlineData: { mimeType: 'image/jpeg', data: image } }
      ]}],
      generationConfig: { responseMimeType: 'application/json' },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text();
    let parsed = null;
    try { parsed = JSON.parse(text); } catch { /* raw text */ }

    // DEBUG: return what we got from Google
    return res.status(200).json({ 
      googleStatus: response.status,
      googleOk: response.ok,
      parsedHasError: !!(parsed?.error),
      errorObj: parsed?.error || null,
      rawFirst200: text.slice(0, 200),
      textFound: (parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '').slice(0, 50)
    });
  } catch (err) {
    return res.status(200).json({ error: err.message || 'Unknown error' });
  }
}
