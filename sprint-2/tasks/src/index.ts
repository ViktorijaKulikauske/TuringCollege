import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: "The food was delicious and the waiter...",
    encoding_format: "float",
  });

  console.log(response.data[0].embedding);
}

main();
