import OpenAI from "openai";
import * as fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const fileContent = fs.readFileSync("./src/article.txt", "utf-8");

//Select an LLM tool of your choice (e.g. ChatGPT, Perplexity, Gemini) and create a prompt that will summarize the finding and explain all the scientific terms next to them in brackets
const response_one = await openai.responses.create({
  model: "gpt-4o",
  input: `${fileContent}
  Summarize the following HTML content in a 3-4 sentences.  and explain all the scientific terms next to them in brackets`,
});

// console.log(response_one.output_text);

//Building on the previous step, the prompt should also structure the output as a numbered list.
const response_two = await openai.responses.create({
  model: "gpt-4o",
  input: `${fileContent}
    Summarize this abstract into 3-4 bullet points and explain all the scientific terms next to them in brackets. Structure the output as a numbered list.`,
});
// console.log(response_two.output_text);

// Building on the previous step, each bullet-point should start with words "The scientific evidence shows."
const response_three = await openai.responses.create({
  model: "gpt-4o",
  input: `${fileContent}
    Summarize this abstract into 3-4 bullet points. Each bullet-point should start with words "The scientific evidence shows."
    Give explanations of any scientific jargon between square brackets next to, in the sentence.
`,
});
// console.log(response_three.output_text);

//Building on the previous step, there should be no more than 3 items in the list
const response_four = await openai.responses.create({
  model: "gpt-4o",
  input: `${fileContent}
    Summarize this abstract into no more than 3 bullet points. 
    Each bullet-point should start with words "The scientific evidence shows."
    Give explanations of any scientific jargon between square brackets next to, in the sentence.
`,
});
// console.log(response_four.output_text);

//Building on the previous step, modify the prompt for the model to return emojis as part of the text to make it more visually appealing and for better readability.
const response_five = await openai.responses.create({
  model: "gpt-4o",
  input: `${fileContent}
    Summarize this abstract into no more than 3 bullet points. 
    Each bullet-point should start with words "The scientific evidence shows."
    Give explanations of any scientific jargon between square brackets next to, in the sentence.
    Use relevant emojis to make it more visually appealing and for better readability.
`,
});
// console.log(response_five.output_text);

//Building on the previous step, the output should be a one-page web page with headings, an intro, a numbered list as a table, one sentence summary at the bottom, and a call to action to the original paper. Check that the output is a valid web page. e.g., copy and paste the code here https://htmledit.squarefree.com/). Are you fully satisfied with the output? Keep modifying the prompt until you are.
const response_six = await openai.responses.create({
  model: "gpt-4o",
  input: `${fileContent}
    Summarize this abstract into no more than 3 bullet points. 
    Each bullet-point should start with words "The scientific evidence shows."
    Give explanations of any scientific jargon between square brackets next to, in the sentence.
    Use relevant emojis to make it more visually appealing and for better readability.
    The output should be a one-page HTML web page with headings, an intro, a numbered list as a table, one sentence summary at the bottom, and a call to action to the original paper. 
`,
});

console.log(response_six.output_text);
