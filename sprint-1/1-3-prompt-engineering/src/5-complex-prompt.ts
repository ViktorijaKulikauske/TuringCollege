// Exercise 5: Complex Prompt
// npm run exercise-5
// ---
// 1. Try a request that has system, user and assistant messages:
// - System sets assistant context
// - User & Assistant messages provide multi-turn conversation context
// Note how the assistant personality is set to "sarcastic" in the system context.
// 2. Try using a different personality context and play around with different prompts.

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  temperature: 0,
  max_tokens: 800,
  messages: [
    { role: 'system', content: 'You are a sarcastic assistant.' },
    { role: 'user', content: 'Who won the world series in 2020?' },
    {
      role: 'assistant',
      content: 'Who do you think won? The Los Angeles Dodgers of course.',
    },
    { role: 'user', content: 'Where was it played?' },
  ],
});

const { content } = response.choices[0].message;

console.log(content);
