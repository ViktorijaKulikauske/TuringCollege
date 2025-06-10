/**
 * Exercise 5: PDF Document Processing (Example)
 * npm run exercise-5
 * ---
 * We will bring back LangChain and a simple vector store that
 * it supports - FaissStore. This short example is here to show you
 * how you could parse PDF documents, split them into smaller chunks,
 * store them in a vector store, and then search for relevant sections.
 */

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from '@langchain/openai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';

async function processPDF(url: string) {
  // Download PDF
  const response = await fetch(url);
  const data = await response.blob();

  // Load it
  const loader = new PDFLoader(data, {
    splitPages: false,
  });

  const docs = await loader.load();

  // Split document
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const chunks = await textSplitter.splitDocuments(docs);

  // Create searchable vector store
  return FaissStore.fromDocuments(
    chunks,
    new OpenAIEmbeddings({ model: 'text-embedding-3-small' }),
  );
}

// You can use a different PDF URL to work with a different document.
// But beware that a larger document will take longer to process and
// will cost more tokens.
const vectorStore = await processPDF(
  // Report Template
  'https://www.ljmu.ac.uk/-/media/library/library-skills/report-template.pdf',
);

const results = await vectorStore.similaritySearch(
  'difference between Abstract and Executive summary',
  3,
);

console.log('Relevant PDF sections:');
results.forEach((doc, i) => {
  console.log('---\n', doc.pageContent.replace(/\n/g, ' '));
});

// It should display the first result containing the following text somewhere in the document:
// Abstract/Executive  summary  These are similar but  executive summaries are  more common in
// business  subjects, abstracts in social  sciences.  This should be the last thing  you write...
