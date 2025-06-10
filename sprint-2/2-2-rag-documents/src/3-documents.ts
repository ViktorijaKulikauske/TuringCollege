/**
 * Exercise 3: Embed and search documents (Example)
 * npm run exercise-3
 * ---
 * Let's say we need to use a long document as a source of information.
 * Trying to fit the entire document into a single model input can be:
 * - not feasible due to model input size limits,
 * - prohibitively expensive at scale,
 * - limiting in terms of the number of documents we can reference.
 *
 * In this example, you will see one method how to:
 * 1. Load a document from the web
 * 2. Split the document into smaller chunks
 * 3. Embed chunks into a vector store (Faiss - a small vector store)
 * 4. Query the vector store with a question
 *
 * Note. This example does not store the documents in a persistent database.
 * In practice, you would only need to embed the documents once, going straight
 * to step 4 when you need to query the documents for information.
 */

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from '@langchain/openai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';

async function processDocuments(query: string) {
  // Step 1: Load documents
  const loader = new CheerioWebBaseLoader(
    'https://lilianweng.github.io/posts/2023-06-23-agent/',
    {
      selector: '.post-content, .post-title, .post-header',
    },
  );

  // Step 2: Split documents
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const docs = await loader.load();
  const chunks = await textSplitter.splitDocuments(docs);

  // Step 3: Embed text chunks into a vector store
  const vectorStore = await FaissStore.fromDocuments(
    chunks,
    new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      openAIApiKey: process.env.OPENAI_API_KEY,
    }),
  );

  // Step 4: Query the vector store
  const results = await vectorStore.similaritySearch(query, 3);

  // Output results
  console.log('Relevant Chunks:');
  results.forEach((doc, i) => {
    console.log(
      '---\n',
      `Chunk ${i + 1}:\n`,
      `${doc.pageContent.slice(0, 300)}...`,
    );
  });
}

await processDocuments('What are Generative Agents?');
