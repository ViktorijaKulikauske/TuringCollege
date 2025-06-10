# LangChain RAG Lab

This is a starting template for working on the [LangChain RAG app tutorial](https://js.langchain.com/docs/tutorials/rag/). It is based around LangChain v0.3 (latest version at the time of writing). Follow along that tutorial to build a simple RAG app that uses the LangChain API.

Sections Jupyter Notebook and LangSmith sections can be ignored.

The tutorial also uses some LangGraph concepts, though these are not necessary for a RAG application. LangChain's tutorial provides some alternatives on how to implement the same functionality without LangGraph even if the main tutorial uses it.

## Prerequisites

- Having completed the previous lab in this module.
- Node 20.6 or higher (you can setup older versions, but you'd need to add `dotenv`)

## Setup

Make sure to use a Node version that supports `--env-file` flag (20.6 or higher). If you have Node Version Manager installed, you can switch to a compatible version with `npm use 22`, or your preferred version.

- `npm install`

1. Add your desired API keys to the `.env` file.
2. Install any additional dependencies as needed. We have installed dependencies for FAISS and OpenAI, but you may want to install other packages for other APIs. You may also want to remove unused dependencies.
