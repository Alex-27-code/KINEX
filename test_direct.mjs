import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI('AIzaSyCyeuaOUopaUH6SkAn1b_zTEVc1lKnpFLs');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
try {
  const result = await model.generateContent([{ text: 'Return JSON only: {"meal":"test","calories":100}' }]);
  console.log('Direct result:', result.response.text());
} catch(e) {
  console.log('Direct error:', e.message);
}
