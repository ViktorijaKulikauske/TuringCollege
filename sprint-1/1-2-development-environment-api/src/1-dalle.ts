// Exercise 1: Create an image using DALLE from OpenAI
// ---
// Even though we didn't talk about Image generation yet, try finding out the code!
// Visit OpenAI documentation and find out how to create an image using JavaScript openai package.
// Run this exercise with `npm run exercise-1`.

import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const prompt = `
A children's book drawing of a veterinarian using a stethoscope to 
listen to the heartbeat of a baby otter.
`;

const result = await openai.images.generate({
  model: 'gpt-image-1',
  prompt,
});

// Save the image to a file
const image_base64 = result.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, 'base64');
fs.writeFileSync('otter.png', image_bytes);
