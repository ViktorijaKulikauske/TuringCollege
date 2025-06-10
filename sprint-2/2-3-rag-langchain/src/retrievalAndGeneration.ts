import { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';

const promptTemplate = await pull<ChatPromptTemplate>('rlm/rag-prompt');

// Example:
const example_prompt = await promptTemplate.invoke({
  context: '(context goes here)',
  question: '(question goes here)',
});
const example_messages = example_prompt.messages;

console.assert(example_messages.length === 1);
example_messages[0].content;
