/**
 * Exercise 1: Text Embeddings
 * npm run exercise-1
 * ---
 * In this example, we'll look through the process of creating embeddings.
 * Tasks:
 * 1. Generate embeddings for the strings in the `phrases` array and
 *    store them in the `textEmbeddings` array.
 *    This array should contain objects according to the TextEmbedding type.
 *    It will be used in the next exercise to visualize the embeddings.
 * 2. What is your guess on which strings embeddings model will consider similar?
 *    We will test your guess in the next exercise.
 */

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
export const textEmbeddingsPromise: Promise<TextEmbedding[]> = createEmbedding(
  phrases,
).then((embeddings) =>
  phrases.map((text, i) => ({
    text,
    embedding: embeddings[i],
  })),
);
