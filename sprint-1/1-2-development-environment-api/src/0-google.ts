import { GoogleGenerativeAI } from '@google/generative-ai';

// Get your own Google Gemini API KEY here:
// - https://aistudio.google.com/app/apikey
// Run this warm-up exercise with `npm run google`.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const result = await model.generateContent('Explain how AI works');

console.log(result.response.text());
