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
        messages: [
          {
            role: "system",
            content:
              "You are an expert of profession advisor that can help people to find their profession. At the beginning you have to return a list of top 10 main profession categories.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      const { content } = response.choices[0].message;
      return content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI API call failed: ${error.message}`);
      } else {
        throw new Error("OpenAI API call failed with an unknown error.");
      }
    }
  }

  async getMainProfessionCategories(): Promise<string[]> {
    const prompt = "List the main profession categories.";
    try {
      const response = await this.callOpenAI(prompt);
      const content = response; // Adjusted to directly use the content returned by callOpenAI
      return content.trim().split("\n");
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
