import OpenAI from "openai";
import { type ChatCompletionTool } from "openai/resources/index.mjs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// Let's say we have a function, which we want the model to use, if
// it recognizes it as necessary.
type CalculatorParams = {
  num1: number;
  num2: number;
};
function calculatorAdd({ num1, num2 }: CalculatorParams): number {
  return num1 + num2;
}

// Define tools with the calculator_add function
const tools = [
  {
    type: "function",
    function: {
      // Adding a description is optional, but it helps
      // the model to understand when to use this tool.
      // Otherwise, it will use the tool based on the name.
      name: "calculator_add",
      description: "Add two numbers together.",

      // JSON schema of the expected parameters
      parameters: {
        type: "object",
        properties: {
          num1: { type: "number" },
          num2: { type: "number" },
        },
        required: ["num1", "num2"],
      },
    },
  },
] satisfies ChatCompletionTool[];

// Simulate a conversation
const completion = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Add 8 and 12." }],
  tools,
});

// Which tools it wants to call
const toolCall = completion.choices[0].message.tool_calls?.[0].function;
console.log("toolCall", toolCall);

// Parse the arguments string to an object
if (toolCall) {
  const params: CalculatorParams = JSON.parse(toolCall.arguments);
  const result = calculatorAdd(params);
  console.log("result", result);
}
