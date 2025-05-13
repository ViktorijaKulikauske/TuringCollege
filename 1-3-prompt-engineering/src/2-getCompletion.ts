// Exercise 2: Validate OpenAI API Key Setup
// npm run exercise-2
// ---
// We have added a small getCompletion function for a few small prompt experiments.
// The function accepts your text prompt, sends it as a user message and returns the
// AI's response.
// 1. Add the OpenAI API key to the .env file as OPENAI_API_KEY.
// 2. Run the code below to verify that your OpenAI key is set up correctly.
//    You should see a response from the AI model.

import { getCompletion } from './getCompletion';

// 1. Set primary content or prompt text
const text = `Hey! How are you doing today?`;

// 2. Run the prompt
const response = await getCompletion(text);

console.log(response);
