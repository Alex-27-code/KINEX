const API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { image, context } = req.body || {};
  if (!image) {
    res.status(400).json({ error: 'No image provided' });
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional nutritionist analyzing food photos. Your job is to identify the food and estimate nutritional values accurately — even from blurry, partially visible, or poorly lit photos.
RULES:
- ALWAYS identify the food and provide a real estimate. Never say "unable" or "cannot analyze". If the food is blurry or partially visible, make your BEST estimate based on what you CAN see.
- For ANY ambiguous image: still identify what it likely is, estimate portion size, and provide real nutritional values. Do NOT say you cannot analyze it.
- CRITICAL - Screen detection: If the image contains app UI elements (buttons, calorie counters, "AI temporarily unavailable", navigation menus, progress bars, text overlays that look like an app interface), this is NOT a food photo. Return ONLY this JSON: {"error":"BAD_PHOTO","meal":"","calories":0,"protein":0,"carbs":0,"fats":0,"fiber":0}. Do NOT try to parse nutritional data from app UI elements.
- ALWAYS return valid JSON with these exact fields: {"meal":"name","calories":0,"protein":0,"carbs":0,"fats":0,"fiber":0}
- REAL PORTION SIZES in grams — be generous and accurate:
  * Russian/salad dishes (olivye, herring under fur coat, etc.): 300-500g per serving
  * Dumplings (pelmeni, vareniki, etc.): 8-16 pieces = 250-400g → 400-700 kcal
  * Soup (borscht, soup, etc.): 400-600g → 250-450 kcal
  * Main courses with meat/garnish: 400-700g → 500-900 kcal
  * Pasta/rice dishes: 300-500g → 400-700 kcal
  * Pancakes: 3-5 pieces = 150-250g → 300-550 kcal
  * Salads: 200-400g → 150-400 kcal
- If the user provides a correction ("more", "less", "too little", "too much", specific kcal): ADJUST the portion accordingly and recalculate ALL macros proportionally.
- NEVER use round numbers like exactly 250 or 300 unless genuinely estimated.
- Calculate: calories = protein×4 + carbs×4 + fats×9`
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: context || 'Analyze this food photo carefully. Identify what food is shown and provide nutritional estimates. Return JSON only.' },
              { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + image, 'detail': 'high' } }
            ]
          }
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const errorText = await response.text().catch(() => '');
      console.error('OpenAI API error:', status, errorText.slice(0, 200));
      return res.status(200).json({ error: `AI_ERROR:${status}` });
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(200).json({ error: 'No response from AI' });
    }

    const text = data.choices[0].message?.content;
    if (!text || text === 'null') {
      return res.status(200).json({ error: 'No response from AI' });
    }

    const match = text.match(/\{[\s\S]*?\}/);
    if (!match) {
      return res.status(200).json({ error: 'No JSON in response', raw: text.slice(0, 100) });
    }

    const parsed = JSON.parse(match[0]);

    if (parsed.error === 'BAD_PHOTO') {
      return res.status(200).json({ error: 'BAD_PHOTO' });
    }

    // Validate: recalculate calories from macros
    const calcCals = Math.round((parsed.protein || 0) * 4 + (parsed.carbs || 0) * 4 + (parsed.fats || 0) * 9);
    const reportedCals = parsed.calories || 0;
    const diffPct = Math.abs(calcCals - reportedCals) / Math.max(reportedCals, 1);

    const calories = diffPct > 0.15 && calcCals > 0 ? calcCals : reportedCals;

    return res.status(200).json({
      meal: parsed.meal || 'Food',
      calories: Number(calories) || 0,
      protein: Number(parsed.protein) || 0,
      carbs: Number(parsed.carbs) || 0,
      fats: Number(parsed.fats) || 0,
      fiber: Number(parsed.fiber) || 0,
    });
  } catch (err) {
    return res.status(200).json({ error: err.message || 'Unknown error' });
  }
}