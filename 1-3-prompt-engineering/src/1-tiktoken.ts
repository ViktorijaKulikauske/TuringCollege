// Exercise 1: Tokenize Text
// npm run exercise-1
// ---
// 1. Read the code below and try to understand what it does.
// 2. Run the file and see the output.
// 3. Change the text to any prompt input you want to use & re-run to see tokens.

import { encoding_for_model } from 'tiktoken';

// To get the tokeniser corresponding to a specific model in the OpenAI API:
const encoding = encoding_for_model('gpt-3.5-turbo');

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

const tokens = encoding.encode(text);

// First - print the list of tokens as integers
console.log('Token count:', tokens.length);
console.log(tokens);

// Second - decode each token to see what the text versions look like
const tokensDecoded = [...tokens].map((token) => {
  const charInts = encoding.decode_single_token_bytes(token);
  const charNumbers = [...charInts];
  const chars = charNumbers.map((num) => String.fromCharCode(num));

  return chars.join('');
});

// Print the decoded tokens.
// NOTE:
// - Notice how some words are split into multiple tokens.
// - Why would "Jupiter" as the first word in the text be split into two tokens, but
// "Jupiter" is not split into two tokens in the middle of the text?
console.log(tokensDecoded);

// The tiktoken package has an instance of a tokenizer, which should be freed after it is not used
encoding.free();
