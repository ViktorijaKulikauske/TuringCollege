// Exercise 8: Select techniques for Prompt optimization and execute them
// npm run exercise-8
// ---
// In the course, we have talked about many different techniques to get
// the best response from the LLMs.
// Select 2-3 techniques and implement them below to build on top of the
// previous quiz exercise (you can copy over the code from the previous
// exercise).
// They can be either a little bit advanced, like Maieutic Prompting,
// Self-Refinement or Least-to-Most Prompting.
//
// Optional: could you ask the model to provide its answers in a specific
//  JSON format that you can parse later into a JS object?
//
// Optional Advanced: Read about structured outputs:
//  https://openai.com/index/introducing-structured-outputs-in-the-api/
// Try to add a Zod schema with OpenAI Zod helpers to provide a structure
// and validate the output.

import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const QuizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.object({
        A: z.string(),
        B: z.string(),
        C: z.string(),
        D: z.string(),
      }),
      correctAnswer: z.enum(['A', 'B', 'C', 'D']),
      significance: z.string(),
      knowledgeTested: z.string(),
    })
  ),
});

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  temperature: 0,
  max_tokens: 1500,
  response_format: zodResponseFormat(QuizSchema, 'quiz'),

  messages: [
    {
      role: 'user',
      content:
        'Create a quiz with 10 questions about the Solar System, including the Sun, planets, and moons. Each question should have four answer options (A, B, C, D), and one correct answer. Format the output as a numbered list. For each question explain why it is significant and how it tests knowledge of the Solar System.',
    },
  ],
});
const { content } = response.choices[0].message;

console.log(content);
