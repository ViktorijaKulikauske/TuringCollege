// CSV files
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

// utility for resolving relative paths in ES Modules
const relative = (path: string) => new URL(path, import.meta.url).pathname;

const csvLoader = new CSVLoader(relative("./data/mlb_teams_2012.csv"));
const csvData = await csvLoader.load();

// PDF files
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const pdfLoader = new PDFLoader(relative("./data/whitepaper.pdf"));
const pdfData = await pdfLoader.load();

// HTML files
// the LangChain recommended method of loading HTML files requires getting an API key from
// Unstructured service and running a local instance of the Unstructured API.
// However, you can use various Document loaders to load HTML via web - such as `playwright`,
// `cheerio` or other JS-based packages.
// Here we will demonstrate the usage of the UnstructuredLoader, as it's the default method
// in the LangChain documentation.
import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";

const filePath = relative("./data/fake-content.html");

const loader = new UnstructuredLoader(filePath, {
  apiKey: process.env.UNSTRUCTURED_API_KEY,
  apiUrl: process.env.UNSTRUCTURED_API_URL,
});

const data = await loader.load();
