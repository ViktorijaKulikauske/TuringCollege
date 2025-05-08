# Development Environment and APIs Lab

In this lab, you will try out how to use Anthropic, Gemini and OpenAI APIs.

## Prerequisites

- Node v22

## Setup

- `nvm use 22` (if you have Node Version Manager installed)
- `npm install`

1. You will need to have an API key for Anthropic, Google Gemini and OpenAI APIs. Links to the pages where you can get the API keys are provided in the material, but you're a smart cookie and you could probably find them on your own.
2. Populate the `.env` file with the API keys.
3. Go through each of the introductory files one-by-one and run them to see the results.
  - `0-anthropic.ts`
  - `0-google.ts`
  - `0-openai.ts`

We have included a `tsx` dependency to run these TypeScript files. You can run the files with `npx tsx --env-file=.env <file path here>`. Since that can be a bit cumbersome, we have included a few scripts in the `package.json` file to make it easier for you:
  - `npm run anthropic`
  - `npm run google`
  - `npm run openai`

4. Go through the exercises one-by-one and try to solve them. Each file contains comments that will guide you through the process.
    You can run each exercise with `npm run exercise-1`, `npm run exercise-2`, etc.
