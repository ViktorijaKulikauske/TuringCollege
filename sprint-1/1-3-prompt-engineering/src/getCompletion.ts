import OpenAI from 'openai';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/index.mjs';
import { pick } from 'lodash-es';

// Initialize OpenAI instance with your API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const keysAllowed = ['model', 'temperature', 'max_tokens'] as const;

type Params = Partial<
  Pick<ChatCompletionCreateParamsNonStreaming, (typeof keysAllowed)[number]>
>;

/**
 * Get a chat completion from OpenAI API.
 * @param prompt User message
 * @param parameters Optional parameters for the completion
 * @returns AI Assistant response
 */
export async function getCompletion(
  prompt: string,
  parameters: Params = {}
): Promise<string | null> {
  const messages = [{ role: 'user' as const, content: prompt }];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0,
    max_tokens: 800,
    ...pick(parameters, keysAllowed),
    messages,
  });

  return response.choices[0].message.content;
}
