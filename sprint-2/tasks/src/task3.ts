import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Load step

const loader = new CheerioWebBaseLoader(
  "https://lilianweng.github.io/posts/2023-06-23-agent/",
  {
    selector: ".post-header, .post-content",
  }
);

const data = await loader.load();

// Split step
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const splits = textSplitter.splitDocuments(data);

splits.then((chunks) => {
  console.log(chunks);
});

//Embed step

// await vectorStore.addDocuments(splits);
