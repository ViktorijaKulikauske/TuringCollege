// Exercise 5: Generating Code
// ---
// Call OpenAI API to generate code to create a simple Express.js web server.
// Run this exercise with `npm run exercise-5`.

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

async function generateExpressServerCode() {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content:
          'Write a complete JavaScript file that creates a simple Express.js web server listening on port 3000 and responds with "Hello, world!" on the root route.',
      },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  console.log('Generated Express.js server code:\n');
  console.log(completion.choices[0].message.content);
}

generateExpressServerCode().catch(console.error);
