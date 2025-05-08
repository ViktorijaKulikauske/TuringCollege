import Anthropic from '@anthropic-ai/sdk';

// Get your API key from the Anthropic dashboard:
// - https://console.anthropic.com/settings/keys
// Run this warm-up exercise with `npm run anthropic`.

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Claude' }],
  model: 'claude-3-5-sonnet-latest',
});

console.log(message.content);
