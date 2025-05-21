// Exercise 4: Instruction Based
// npm run exercise-4
// ---
// Use the "text" variable to set the primary content
// and the "prompt" variable to provide an instruction related to that primary content.

import { getCompletion } from './getCompletion';

// Here we ask the model to summarize the text for a second-grade student.

// Test Example
// https://platform.openai.com/playground/p/default-summarize

// Example text
const text = `Jupiter is the fifth planet from the Sun and the \
largest in the Solar System. It is a gas giant with \
a mass one-thousandth that of the Sun, but two-and-a-half \
times that of all the other planets in the Solar System combined. \
Jupiter is one of the brightest objects visible to the naked eye \
in the night sky, and has been known to ancient civilizations since \
before recorded history. It is named after the Roman god Jupiter.[19] \
When viewed from Earth, Jupiter can be bright enough for its reflected \
light to cast visible shadows,[20] and is on average the third-brightest \
natural object in the night sky after the Moon and Venus.`;

// Wrap the text in your custom prompt with additional instructions
const prompt = `Summarize content you are provided with for a second-grade student.
\`\`\`${text}\`\`\`
`;

// Run the prompt
const response = await getCompletion(prompt);

console.log(response);
