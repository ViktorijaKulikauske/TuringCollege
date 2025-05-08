// Exercise 2: OpenAI - Explore Token Limits
// ---
// Experiment with the token limit of an LLM.
// Create a prompt and adjust the max_tokens parameter to see how output changes.
// Ask yourself a question: what does the max_tokens mean?
// Run this exercise with `npm run exercise-2`.

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const completion = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What does the max_tokens mean?' },
  ],
  temperature: 0.7,
  max_tokens: 1,
});

console.log(completion.choices[0].message.content);
