/**
 * Exercise 4: SQLite Embeddings Storage
 * npm run exercise-4
 * ---
 * In this exercise, we will implement a simple SQLite-based embeddings
 * store.
 *
 * For this example, we will not even use LangChain - just a source of
 * embeddings (OpenAI) and a database (SQLite).
 *
 * As you will build professional RAG applications, you will need to
 * use different embeddings sources, different databases, and possibly
 * some framework abstractions, such as LangChain. However, for this
 * exercise, we will strip everything down to the basics.
 *
 * The goal of this exercise is not to teach you how to build this type of
 * module from scratch, but to reinforce the key steps you would need to
 * address no matter if you're using LangChain or not.
 * ---
 * Task:
 * Using the provided functions, finish assembling the solution ~120 line
 * mark, near the "TODO:" comment.
 * ---
 * Note. SQLite is not an ideal choice for vector operations, at least
 * without additional extensions. However, it is good enough for a tiny
 * dataset. For a larger dataset, you would want to use a database that
 * treats vectors as first-class citizens. This could be a document store,
 * such as Milvus, or even a classic SQL database with vector extensions,
 * such as PostgreSQL with the pgvector extension.
 */

// @ts-ignore - issue with better-sqlite3 types
import Database from 'better-sqlite3';
import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type TextSimilarity = { text: string; similarity: number };
type TextEmbedding = { text: string; embedding: number[] };

function initDatabase(path: string) {
  const dbPath = resolve(process.cwd(), path);
  const dir = dirname(dbPath);
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
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
async function createAndStoreEmbeddings(db: Database, inputs: string[]) {
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
      // A slow query, but it works well enough in our case.
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
const query = 'food';

createAndStoreEmbeddings(db, texts)
  .then(() => {
    return createEmbeddings([query]);
  })
  .then((queryEmbeddings) => {
    return findMostSimilar(db, queryEmbeddings[0].embedding, 3);
  })
  .then((results) => {
    console.log(`Most similar to "${query}":`);
    results.forEach((row, i) => {
      console.log(
        `${i + 1}. ${row.text} (similarity: ${row.similarity.toFixed(3)})`,
      );
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// TODO: Finish the solution
// 1. using createAndStoreEmbeddings store the existing texts in the database
// 2. using createEmbeddings create embeddings for the query
// 3. using findMostSimilar find 3 the most similar texts to the query
// 4. log the results

// console.log(`Most similar to "${query}":`);
// results.forEach((row, i) => {
//   console.log(
//     `${i + 1}. ${row.text} (similarity: ${row.similarity.toFixed(3)})`,
//   );
// });
// ---
// Expected result:
// Most similar to "vehicle transportation":
// 1. car (similarity: 0.409)
// 2. bike (similarity: 0.405)
// 3. airplane (similarity: 0.312)
// 3. airplane (similarity: 0.312)
