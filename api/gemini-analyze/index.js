const GEMINI_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { image, context, locale } = req.body || {};
  if (!image) { res.status(400).json({ error: 'No image provided' }); return; }
  if (!GEMINI_KEY) { res.status(500).json({ error: 'GEMINI_API_KEY not set' }); return; }

  const lang = String(locale || 'en').toLowerCase().slice(0, 2);
  const li = { ru: 'Отвечай на РУССКОМ языке. JSON only.', de: 'Antworte auf DEUTSCH. JSON only.', es: 'Responde en ESPAÑOL. JSON only.', en: 'Respond in ENGLISH. JSON only.' }[lang] || 'Respond in ENGLISH. JSON only.';

  const prompts = {
    ru: context
      ? `${li} Корректировка: "${context}". Верни JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ВСЯ порция на фото, не на 100г.`
      : `${li} Диетолог. JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ВСЯ порция на фото.`,
    en: context
      ? `${li} Correct: "${context}". JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. WHOLE portion, not per 100g.`
      : `${li} Nutritionist. JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. WHOLE portion in photo.`,
    de: context
      ? `${li} Korrigieren: "${context}". JSON: {"meal":"Gericht","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Ganzes Portion.`
      : `${li} Ernährungsberater. JSON: {"meal":"Gericht","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Ganzes Portion.`,
    es: context
      ? `${li} Corregir: "${context}". JSON: {"meal":"plato","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Porción completa.`
      : `${li} Nutricionista. JSON: {"meal":"plato","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Porción completa.`,
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompts[lang] || prompts.en }, { inlineData: { mimeType: 'image/jpeg', data: image } }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      }
    );
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) return res.status(200).json({ error: 'EMPTY_RESPONSE' });
    let json = null;
    try { json = JSON.parse(text); } catch (_) {}
    if (!json) {
      const m = text.match(/\{[\s\S]*?\}/);
      if (m) try { json = JSON.parse(m[0]); } catch (_) {}
    }
    if (!json || (json.meal == null && json.calories == null)) return res.status(200).json({ error: 'PARSE_FAILED' });
    return res.status(200).json({ meal: String(json.meal || 'Food'), calories: Number(json.calories)||0, protein: Number(json.protein)||0, carbs: Number(json.carbs)||0, fats: Number(json.fats)||0, fiber: Number(json.fiber)||0 });
  } catch (err) {
    console.error('gemini-analyze error:', err.message);
    return res.status(200).json({ error: err.message || 'Unknown error' });
  }
}
