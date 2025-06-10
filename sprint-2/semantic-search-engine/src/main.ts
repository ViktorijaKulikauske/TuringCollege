import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

//https://js.langchain.com/docs/tutorials/retrievers/

const loader = new PDFLoader("./data/nke-10k-2023.pdf");

const docs = await loader.load();
console.log(docs.length);

// Output the first 200 characters of the first document's content
console.log(docs[0].pageContent.slice(0, 200));

// Output the first 200 characters of the first document's metadata
console.log(docs[0].metadata);

//Splitting
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const allSplits = await textSplitter.splitDocuments(docs);

console.log(allSplits.length);

//Embedding

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});

const vector1 = await embeddings.embedQuery(allSplits[0].pageContent);
const vector2 = await embeddings.embedQuery(allSplits[1].pageContent);

console.assert(vector1.length === vector2.length);
console.log(`Generated vectors of length ${vector1.length}\n`);
console.log(vector1.slice(0, 10));

// Langchain vector store

const vectorStore = new MemoryVectorStore(embeddings);

await vectorStore.addDocuments(allSplits);

const results1 = await vectorStore.similaritySearch(
  "When was Nike incorporated?"
);

console.log(
  `First result for the query "When was Nike incorporated?":\n`,
  results1[0]
);
console.log(
  `Found ${results1.length} results for the query "When was Nike incorporated?"\n`
);

const results2 = await vectorStore.similaritySearchWithScore(
  "What was Nike's revenue in 2023?"
);

console.log(
  `First result for the query "What was Nike's revenue in 2023?":\n`,
  results2[0]
);
console.log(
  `Found ${results2.length} results for the query "What was Nike's revenue in 2023?"\n`
);

const embedding = await embeddings.embedQuery(
  "How were Nike's margins impacted in 2023?"
);

const results3 = await vectorStore.similaritySearchVectorWithScore(
  embedding,
  1
);

console.log(
  `First result for the query "How were Nike's margins impacted in 2023?":\n`,
  results3[0]
);

const retriever = vectorStore.asRetriever({
  searchType: "mmr",
  searchKwargs: {
    fetchK: 1,
  },
});

const results4 = await retriever.batch([
  "When was Nike incorporated?",
  "What was Nike's revenue in 2023?",
]);

console.log(
  `First result for the query "When was Nike incorporated?" using retriever:\n`,
  results4[0]
);
console.log(
  `First result for the query "What was Nike's revenue in 2023?" using retriever:\n`,
  results4[1]
);
