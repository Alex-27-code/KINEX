export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { image } = req.body || {};
  if (!image) { res.status(400).json({ error: 'No image provided' }); return; }

  // List ALL env vars that contain certain keywords
  const relevantKeys = Object.keys(process.env).filter(k => 
    k.includes('GEMINI') || k.includes('API') || k.includes('KEY') || k.includes('VERCEL') || k.includes('OPENAI')
  ).sort();

  return res.status(200).json({ 
    envKeys: relevantKeys,
    geminiKey: process.env.GEMINI_API_KEY ? 'FOUND:' + process.env.GEMINI_API_KEY.slice(0, 8) : 'MISSING',
    viteGeminiKey: process.env.VITE_GEMINI_API_KEY ? 'FOUND:' + process.env.VITE_GEMINI_API_KEY.slice(0, 8) : 'MISSING',
  });
}
