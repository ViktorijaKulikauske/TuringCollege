import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// Get your own OpenAI API KEY here:
// - https://platform.openai.com/api-keys
// Add your API key to the .env file between the quotes.
// Change the "Write a haiku about recursion in programming."
// to the prompt you want to send to the ChatGPT.
// Run the exercise with `npm run openai` in the terminal.

const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is a 2+2' },
  ],
  temperature: 0.7,
  max_tokens: 200,
});

console.log(completion.choices[0].message.content);
