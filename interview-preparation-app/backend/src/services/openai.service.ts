import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class OpenAIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  async callOpenAI(prompt: string, systemMessage?: string): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0,
        max_tokens: 800,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: systemMessage || "",
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
    const systemMessage =
      "You are an expert profession advisor. Return the top 10 main profession categories as a JSON object with a 'profession_categories' array property.";
    try {
      const response = await this.callOpenAI(prompt, systemMessage);
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

  async getPositionsByCategory(category: string): Promise<string[]> {
    const prompt = `List the top 10 job positions in the "${category}" profession category as a JSON array in a property called "positions".`;
    const systemMessage =
      "You are an expert profession advisor. Return the top 10 job positions for a given profession category as a JSON object with a 'positions' array property.";
    try {
      const response = await this.callOpenAI(prompt, systemMessage);
      return response.positions;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to fetch positions for category: ${error.message}`
        );
      } else {
        throw new Error(
          "Failed to fetch positions for category with an unknown error."
        );
      }
    }
  }

  async getInterviewPrepByPosition(position: string): Promise<string[]> {
    const prompt = `List the top 10 questions, exercises, or personality tests that could be asked or given during a job interview for the position "${position}". Return them as a JSON array in a property called "interview_preparation".`;
    const systemMessage =
      "You are an expert interview coach. Return the top 10 questions, exercises, or personality tests for a given job position as a JSON object with an 'interview_preparation' array property.";
    try {
      const response = await this.callOpenAI(prompt, systemMessage);
      return response.interview_preparation;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to fetch interview preparation for position: ${error.message}`
        );
      } else {
        throw new Error(
          "Failed to fetch interview preparation for position with an unknown error."
        );
      }
    }
  }

  async getSuggestedAnswersByQuestion(question: string): Promise<string[]> {
    const prompt = `List the top 5 answers or answer strategies that would help a candidate prepare for the following interview question: "${question}". Return them as a JSON array in a property called "suggested_answers".`;
    const systemMessage =
      "You are an expert interview coach. Return the top 5 answers or answer strategies for a given interview question as a JSON object with a 'suggested_answers' array property.";
    try {
      const response = await this.callOpenAI(prompt, systemMessage);
      return response.suggested_answers;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to fetch suggested answers for question: ${error.message}`
        );
      } else {
        throw new Error(
          "Failed to fetch suggested answers for question with an unknown error."
        );
      }
    }
  }
}
