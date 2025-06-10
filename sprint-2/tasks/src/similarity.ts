import { OpenAI } from "openai/index.mjs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Embedding = number[];
type TextEmbedding = {
  text: string;
  embedding: Embedding;
};

// Inlining the code for simplicity
// 1. Get embeddings for all inputs
const embeddings: TextEmbedding[] = await getEmbeddings([
  "Hi",
  "car",
  "tourist",
  "hello",
  "vehicle",
]);

// 2. Find and print nearest neighbors for each text
const embeddingsClosest = embeddings.map(({ text, embedding }) => {
  const embeddingsToCompare = embeddings.filter((item) => item.text !== text);
  const neighbors = findNearestNeighbors(embedding, embeddingsToCompare, 3);

  return {
    text,
    neighbors,
  };
});

// 3. Prepare and print the results
const table = embeddingsClosest.map(({ text, neighbors }) => ({
  text,
  closest: neighbors.map(
    (neighbor) => `${neighbor.text} (${neighbor.distance.toFixed(2)})`
  ),
}));

console.table(table);

async function getEmbeddings(
  strings: string[],
  model: string = "text-embedding-3-small"
): Promise<TextEmbedding[]> {
  const response = await client.embeddings.create({
    model: model,
    input: strings,
  });

  return response.data.map(({ embedding, index }) => ({
    embedding,
    text: strings[index],
  }));
}

function findNearestNeighbors(
  query: Embedding,
  allEmbeddings: TextEmbedding[],
  k: number = 5
): { text: string; distance: number }[] {
  return allEmbeddings
    .map((item) => ({
      text: item.text,
      distance: dotProductSimilarity(query, item.embedding),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
}

// dot product similarity, which is the same as cosine similarity
// for normalized vectors, which is the case for OpenAI embeddings.
function dotProductSimilarity(a: Embedding, b: Embedding): number {
  return a.reduce((acc, val, i) => acc + val * b[i], 0);
}
