// NOTE: This has to run in the src folder, not in the solutions folder to work properly.

import { OpenAI } from 'openai';
// @ts-ignore
import Database from 'better-sqlite3';
import { join } from 'node:path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type TextSimilarity = { text: string; similarity: number };
type TextEmbedding = { text: string; embedding: number[] };

function initDatabase(path: string) {
  const dbPath = join(new URL('..', import.meta.url).pathname, path);

  const db = new Database(dbPath);

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS embeddings (
      id INTEGER PRIMARY KEY,
      text TEXT NOT NULL,
      embedding TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  ).run();

  return db;
}

async function createEmbeddings(inputs: string[]): Promise<TextEmbedding[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: inputs,
    encoding_format: 'float',
  });

  return response.data.map(({ embedding, index }) => ({
    embedding,
    text: inputs[index],
  }));
}

// Generate and store embeddings
async function storeEmbeddings(db: Database, inputs: string[]) {
  const inputsToEmbed = (() => {
    const inputsExisting = db
      .prepare('SELECT text FROM embeddings')
      .all()
      .map((row: Pick<TextEmbedding, 'text'>) => row.text);

    return inputs.filter((input) => !inputsExisting.includes(input));
  })();

  if (!inputsToEmbed.length) return;

  const textEmbeddings = await createEmbeddings(inputsToEmbed);

  const insert = db.prepare(
    'INSERT INTO embeddings (text, embedding) VALUES (?, ?)',
  );

  db.transaction(() => {
    textEmbeddings.forEach(({ embedding, text }) => {
      insert.run(text, JSON.stringify(embedding));
    });
  })();
}

function findMostSimilar(
  db: Database,
  queryEmbedding: number[],
  limit: number,
): TextSimilarity[] {
  return db
    .prepare(
      `
      SELECT text,
        (SELECT SUM(db.value * JSON_EXTRACT(query.value, '$'))
        FROM JSON_EACH(embedding) AS db
        JOIN JSON_EACH(?) AS query
        ON db.fullkey = query.fullkey) AS similarity
      FROM embeddings
      ORDER BY similarity DESC
      LIMIT ?
      `,
    )
    .all(JSON.stringify(queryEmbedding), limit);
}

// Database setup
const db = initDatabase('./db/embeddings.db');

const texts = [
  'car',
  'bike',
  'airplane',
  'sky',
  'king',
  'queen',
  'A delicious meal',
  'Tasty dinner',
  'Poor service experience',
  'Rude staff interaction',
];
const query = 'vehicle transportation';

await storeEmbeddings(db, texts);
const queryEmbedding = (await createEmbeddings([query]))[0].embedding;
const results = findMostSimilar(db, queryEmbedding, 3);

console.log(`Most similar to "${query}":`);
results.forEach((row, i) => {
  console.log(
    `${i + 1}. ${row.text} (similarity: ${row.similarity.toFixed(3)})`,
  );
});
// ---
// Expected result:
// Most similar to "vehicle transportation":
// 1. car (similarity: 0.409)
// 2. bike (similarity: 0.405)
// 3. airplane (similarity: 0.312)
