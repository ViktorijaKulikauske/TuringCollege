import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class OpenAIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  async callOpenAI(prompt: string): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0,
        max_tokens: 800,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are an expert profession advisor. Return the top 10 main profession categories as a JSON object with a 'profession_categories' array property.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      const { content } = response.choices[0].message;
      return JSON.parse(content as string);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI API call failed: ${error.message}`);
      } else {
        throw new Error("OpenAI API call failed with an unknown error.");
      }
    }
  }

  async getMainProfessionCategories(): Promise<string[]> {
    const prompt =
      "List the main profession categories as an array in a property called 'profession_categories'.";
    try {
      const response = await this.callOpenAI(prompt);
      return response.profession_categories;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to fetch profession categories: ${error.message}`
        );
      } else {
        throw new Error(
          "Failed to fetch profession categories with an unknown error."
        );
      }
    }
  }
}
