// Exercise 7: Generate a Quiz
// npm run exercise-7
// ---
// During a holiday celebration, your family decided to play a quiz game.
// But you don't have any questions for the quiz.
// Ask ChatGPT to create 10 questions from X, Y, Z topics in a specific
// format that you will define (it can use A, B, C, D or something else).
// Print the questions to the console.

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  temperature: 0,
  max_tokens: 800,
  messages: [
    {
      role: 'user',
      content:
        'Create a quiz with 10 questions about the Solar System, including the Sun, planets, and moons. Each question should have four answer options (A, B, C, D), and one correct answer. Format the output as a numbered list.',
    },
  ],
});
const { content } = response.choices[0].message;
console.log(content);
