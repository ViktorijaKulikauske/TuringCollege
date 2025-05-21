// Exercise 6: Generate TypeScript code
// npm run exercise-6
// ---
// Write a prompt and execute it using client.chat.completions API
// to generate TypeScript code for email sending.
// Use nodemailer.
// Make sure it has error handling.
// The code might not work and that is OK.

import OpenAI from 'openai';
import nodemailer from 'nodemailer';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  temperature: 0,
  max_tokens: 800,
  messages: [
    {
      role: 'system',
      content:
        'You are an expert email assistant. Write a polite and professional email to a manager requesting vacation approval. The manager is Jane Smith, Director of Engineering. Keep it concise and to the point.',
    },
    {
      role: 'user',
      content:
        'Write an email to my manager requesting vacation approval for the first week of July. I want to go to Hawaii. My name is John Doe and I work in the engineering department.',
    },
  ],
});

const { content } = response.choices[0].message;

console.log(content);

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'maddison53@ethereal.email',
    pass: 'jn7jnAPss4f63QBp6D',
  },
});

(async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: 'bar@example.com, baz@example.com',
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    });

    console.log('Message sent:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
})();
