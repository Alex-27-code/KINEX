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

  console.log('[ai-proxy] Request received. image length:', image.length, 'key exists:', !!GEMINI_KEY);

  const lang = String(locale || 'en').toLowerCase().slice(0, 2);
  const li = { ru: 'Отвечай на РУССКОМ языке.', de: 'Antworte auf DEUTSCH.', es: 'Responde en ESPAÑOL.', en: 'Respond in ENGLISH.' }[lang] || 'Respond in ENGLISH.';

  const prompts = {
    ru: context
      ? `${li} Корректировка: "${context}". JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ВСЯ порция, не на 100г. Если несколько продуктов — все через запятую. НИКОГДА не пиши "unknown".`
      : `${li} Диетолог. JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ВСЯ порция на фото, не на 100г. Если на фото еда — опиши её, НИКОГДА не говори "unknown" или "unable". Если несколько продуктов — опиши все компоненты. Отвечай ТОЛЬКО валидным JSON.`,
    en: context
      ? `${li} Correct: "${context}". JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. WHOLE portion.`
      : `${li} Nutritionist. JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. WHOLE portion. If food is visible — describe it, NEVER say "unknown". Respond with ONLY valid JSON.`,
    de: context
      ? `${li} Korrigieren: "${context}". JSON: {"meal":"Gericht","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Ganzes Portion.`
      : `${li} Ernährungsberater. JSON: {"meal":"Gericht","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Ganzes Portion. Niemals "unknown" sagen.`,
    es: context
      ? `${li} Corregir: "${context}". JSON: {"meal":"plato","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Porción completa.`
      : `${li} Nutricionista. JSON: {"meal":"plato","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Porción completa. Nunca decir "unknown".`,
  };

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
    const requestBody = {
      contents: [{ parts: [{ text: prompts[lang] || prompts.en }, { inlineData: { mimeType: 'image/jpeg', data: image } }] }],
      generationConfig: { responseMimeType: 'application/json' },
    };

    console.log('[ai-proxy] Sending to Gemini. URL:', apiUrl.slice(0, 80));
    console.log('[ai-proxy] Body size:', JSON.stringify(requestBody).length);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const raw = await response.text();
    console.log('[ai-proxy] Gemini status:', response.status, 'raw len:', raw.length, 'raw:', raw.slice(0, 200));

    let data;
    try { data = JSON.parse(raw); } catch (_) { data = {}; }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('[ai-proxy] Parsed text:', text.slice(0, 100));

    if (!text || text === 'null') {
      return res.status(200).json({ error: 'EMPTY_RESPONSE' });
    }

    let json = null;
    try { json = JSON.parse(text); } catch (_) {}
    if (!json) {
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        try { json = JSON.parse(text.slice(start, end + 1)); } catch (_) {}
      }
    }

    if (!json || (json.meal == null && json.calories == null)) {
      return res.status(200).json({ error: 'PARSE_FAILED' });
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
    console.error('[ai-proxy] Exception:', err.message || err);
    return res.status(200).json({ error: err.message || 'Unknown error' });
  }
}