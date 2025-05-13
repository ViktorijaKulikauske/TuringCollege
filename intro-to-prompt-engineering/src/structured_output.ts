import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const BookRecommendation = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  reading_time_minutes: z.number(),
});

const response = await openai.beta.chat.completions.parse({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content:
        "You are a librarian with expertise in book recommendations. Suggest highly-rated books that match the user's interests.",
    },
    { role: "user", content: "Recommend me a science fiction book" },
  ],
  response_format: zodResponseFormat(BookRecommendation, "book"),
});

console.log(response.choices[0].message.parsed);
// Output: {title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', reading_time_minutes: 2070}
