// Exercise 3: Fabrications
// npm run exercise-3
// ---
// 1. Explore what happens when you ask the LLM to return completions for a
//    prompt about a topic that may not exist, or about topics that it may not
//    know about because it was outside it's pre-trained dataset (more recent).
// 2. See how the response changes if you try a different model, such as
//    gpt-4o-mini, gpt-3.5-turbo.
// 3. Some models are more capable of detecting when a prompt asks for non-factual
//    information. Then, it might respond with a disclaimer or a warning that the
//    information is not real. Try to modify the prompt to see if this can be bypassed.

import { getCompletion } from './getCompletion';

const text = `generate a lesson plan on the Martian War of 2076.`;

// getCompletion function optionally accepts additional parameters, such as model.
const response = await getCompletion(text, { model: 'gpt-4o-mini' });

console.log(response);
