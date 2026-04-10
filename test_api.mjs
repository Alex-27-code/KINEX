const jpegBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

const res = await fetch('https://kinex-web-tau.vercel.app/api/analyze-food', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image: jpegBase64, context: '' }),
});
const text = await res.text();
console.log('Status:', res.status);
console.log('Body:', text.slice(0, 500));
