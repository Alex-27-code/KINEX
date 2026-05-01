const GEMINI_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { image, context, locale, provider } = req.body || {};
  if (!image) { res.status(400).json({ error: 'No image provided' }); return; }

  const lang = String(locale || 'en').toLowerCase().slice(0, 2);
  const li = { ru: 'Отвечай на РУССКОМ языке.', de: 'Antworte auf DEUTSCH.', es: 'Respode en ESPAÑOL.', en: 'Respond in ENGLISH.' }[lang] || 'Respond in ENGLISH.';

  // ---- Gemini 2.5 Flash ----
  async function tryGemini() {
    if (!GEMINI_KEY) return { error: 'NO_GEMINI_KEY' };
    const prompts = {
      ru: context
        ? `${li} Корректировка: "${context}". JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. ВСЯ порция на фото, не на 100г. Если несколько продуктов — перечисли ВСЕ через запятую ("курица + рис + овощи"). Дай РЕАЛЬНУЮ оценку порции. НИКОГДА не пиши "unknown" или "unable to identify". Если на фото еда — опиши её и оцени КАЛОРИИ И БЕЛКИ ДЛЯ ВСЕЙ ПОДАЧИ.`
        : `${li} Диетолог. ВСЯ порция на фото, не на 100г. ВАЖНО: если на фото несколько продуктов (тарелка с разными блюдами, обед из нескольких компонентов) — опиши ВСЕ компоненты и дай суммарную оценку для целой тарелки. Примеры: "шашлык + лаваш + салат" (~800ккал, 40г белка), "куриная грудка + рис + огурцы" (~500ккал, 45г белка). Дай реальную оценку калорий и БЖУ. Если на фото ОДИН продукт — тоже дай оценку. JSON: {"meal":"название","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. НИКОГДА не говори "unknown" или "unable" — если на фото есть еда, опиши её.`,
      en: context
        ? `${li} Correct: "${context}". JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. WHOLE portion. If multiple foods — list all.`
        : `${li} Nutritionist. JSON: {"meal":"foods on plate","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. IMPORTANT: If the photo shows multiple foods (a plate with different dishes, a meal with several components) — identify ALL components and give the TOTAL nutritional value for the whole plate. NEVER say "unknown" or "unable" if food is visible. If there's food in the image, describe it and estimate.`,
      de: context
        ? `${li} Korrigieren: "${context}". JSON: {"meal":"Gericht","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Ganzes Portion.`
        : `${li} Ernährungsberater. JSON: {"meal":"Gericht","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. WICHTIG: Wenn mehrere Speisen auf dem Teller sind — alle erfassen und Gesamtnährwerte schätzen. Niemals "unknown" sagen.`,
      es: context
        ? `${li} Corregir: "${context}". JSON: {"meal":"plato","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Porción completa.`
        : `${li} Nutricionista. JSON: {"meal":"plato","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Si hay varios alimentos — identificarlos todos y dar valor total. Nunca decir "unknown".`,
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompts[lang] || prompts.en }, { inlineData: { mimeType: 'image/jpeg', data: image } }] }],
            generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 800 };
          }),
        }
      );
      const raw = await response.text();
      let data;
      try { data = JSON.parse(raw); } catch (_) { data = {}; }
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text) return { error: 'EMPTY_RESPONSE' };
      let json = null;
      try { json = JSON.parse(text); } catch (_) {}
      if (!json) { const m = text.match(/\{[\s\S]*\}/); if (m) try { json = JSON.parse(m[0]); } catch (_) {} }
      if (!json || (json.meal == null && json.calories == null)) return { error: 'PARSE_FAILED' };
      return {
        meal: String(json.meal || 'Food'),
        calories: Number(json.calories) || 0,
        protein: Number(json.protein) || 0,
        carbs: Number(json.carbs) || 0,
        fats: Number(json.fats) || 0,
        fiber: Number(json.fiber) || 0,
      };
    } catch (err) {
      return { error: err.message || 'GEMINI_ERROR' };
    }
  }

  // ---- OpenAI GPT-4o-mini ----
  async function tryOpenAI() {
    if (!OPENAI_KEY) return { error: 'NO_OPENAI_KEY' };
    const systemPrompt = `You are a professional nutritionist. Identify ALL foods in the photo and estimate nutritional values for the WHOLE PLATE / entire portion shown. Be specific and detailed.
RULES:
- ALWAYS identify the food and provide a real estimate. NEVER say "unable" or "cannot analyze".
- If multiple foods on the plate — identify ALL of them.
- Return JSON ONLY with these exact fields: {"meal":"food name(s)","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}
- Estimate portion sizes realistically (in grams):
  * Russian/salad dishes: 300-500g
  * Dumplings: 8-16 pieces = 250-400g
  * Soups: 400-600ml
  * Main courses: 400-700g
  * Pancakes: 3-5 pieces = 150-250g
  * Salads: 200-400g
- If ambiguous — make your best estimate.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_KEY },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: [
              { type: 'text', text: context || 'Analyze this food photo carefully. Identify ALL foods and estimate nutritional values for the whole portion. Return JSON only.' },
              { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + image, 'detail': 'high' } }
            ]},
          ],
          max_tokens: 400,
        }),
      });
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || '';
      if (!text) return { error: 'OPENAI_EMPTY' };
      let json = null;
      try { json = JSON.parse(text); } catch (_) {}
      if (!json) { const m = text.match(/\{[\s\S]*\}/); if (m) try { json = JSON.parse(m[0]); } catch (_) {} }
      if (!json || (json.meal == null && json.calories == null)) return { error: 'OPENAI_PARSE_FAILED' };
      return {
        meal: String(json.meal || 'Food'),
        calories: Number(json.calories) || 0,
        protein: Number(json.protein) || 0,
        carbs: Number(json.carbs) || 0,
        fats: Number(json.fats) || 0,
        fiber: Number(json.fiber) || 0,
      };
    } catch (err) {
      return { error: err.message || 'OPENAI_ERROR' };
    }
  }

  // Try providers in order
  let result;
  const prefer = provider === 'openai' ? ['openai', 'gemini'] : ['gemini', 'openai'];

  for (const p of prefer) {
    if (p === 'gemini') { result = await tryGemini(); }
    else { result = await tryOpenAI(); }

    // Re-check after each attempt: reject garbage responses
    const isGarbage = !result.error && (
      !result.meal ||
      result.meal === 'unknown' ||
      result.meal === 'Unable to identify' ||
      result.meal === 'No food visible' ||
      result.meal === '' ||
      (result.calories === 0 && result.protein === 0 && result.carbs === 0 && result.fats === 0 && result.fiber === 0)
    );

    if (!result.error && !isGarbage) break;
    if (result.error) console.warn(`[ai-proxy] ${p} failed: ${result.error}, trying next...`);
    if (isGarbage) console.warn(`[ai-proxy] ${p} returned garbage (meal="${result.meal}", cals=${result.calories}), trying next...`);
  }

  if (result.error) return res.status(200).json({ error: result.error });
  return res.status(200).json(result);
}
