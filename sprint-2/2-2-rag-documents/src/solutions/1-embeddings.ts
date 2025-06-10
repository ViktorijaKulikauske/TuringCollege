import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function createEmbedding(inputs: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: inputs,
    encoding_format: 'float',
  });

  return response.data.map((embedding) => embedding.embedding);
}

// Generate embeddings
type TextEmbedding = {
  text: string;
  embedding: number[];
};

const phrases = ['car', 'bike', 'airplane', 'sky', 'king', 'queen'];
export const textEmbeddings: TextEmbedding[] = (
  await createEmbedding(phrases)
).map((embedding, index) => ({
  embedding,
  text: phrases[index],
}));

console.log('Showing first 10 elements of each embedding:');

textEmbeddings.forEach(({ text, embedding }) => {
  console.log(text, embedding.slice(0, 10));
});
