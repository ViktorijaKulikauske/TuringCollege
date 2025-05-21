import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

export type PromptTechnique =
  | "zero-shot"
  | "few-shot"
  | "chain-of-thought"
  | "role-play"
  | "self-critique"
  | "socratic";

const SYSTEM_PROMPTS: Record<PromptTechnique, string> = {
  "zero-shot":
    "You are an expert career and interview coach. Always respond in JSON format as requested in the user prompt. Be concise, relevant, and helpful for job interview preparation.",
  "few-shot":
    "You are an expert career and interview coach. Here are some examples of good responses: {examples}. Now, always respond in JSON format as requested in the user prompt. Be concise, relevant, and helpful for job interview preparation.",
  "chain-of-thought":
    "You are an expert career and interview coach. Think step by step. Always respond in JSON format as requested in the user prompt. Be concise, relevant, and helpful for job interview preparation.",
  "role-play":
    "You are an expert career and interview coach. Let's do a role-play. Always respond in JSON format as requested in the user prompt. Be concise, relevant, and helpful for job interview preparation.",
  "self-critique":
    "You are an expert career and interview coach. After each response, include a self-critique of the response in JSON format. Be concise, relevant, and helpful for job interview preparation.",
  socratic:
    "You are an expert career and interview coach. Use Socratic questioning: instead of giving direct answers, guide the user to think critically by asking probing questions. Always respond in JSON format as requested in the user prompt. Be concise, relevant, and helpful for job interview preparation.",
};

@Injectable()
export class OpenAIService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  private readonly systemMessage =
    "You are an expert career and interview coach. Always respond in JSON format as requested in the user prompt. Be concise, relevant, and helpful for job interview preparation.";

  async callOpenAI(
    userPrompt: string,
    technique: PromptTechnique = "zero-shot",
    options?: { temperature?: number }
  ): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        temperature: options?.temperature ?? 0,
        max_tokens: 800,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[technique] },
          { role: "user", content: userPrompt },
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
      "List the top 10 main profession categories as a JSON object with a property 'profession_categories' containing an array of category names.";
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

  async getPositionsByCategory(category: string): Promise<string[]> {
    const prompt = `List the top 10 job positions in the "${category}" profession category as a JSON object with a property 'positions' containing an array of position names.`;
    try {
      const response = await this.callOpenAI(prompt);
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

  async getInterviewPrepByPosition(
    position: string,
    technique: PromptTechnique = "zero-shot",
    temperature: number = 0
  ): Promise<string[]> {
    const prompt = `List the top 10 questions, exercises, or personality tests that could be asked or given during a job interview for the position "${position}". Respond as a JSON object with a property 'interview_preparation' containing an array of strings.`;
    try {
      const response = await this.callOpenAI(prompt, technique, {
        temperature,
      });
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

  async getSuggestedAnswersByQuestion(
    question: string,
    technique: PromptTechnique = "zero-shot",
    temperature: number = 0
  ): Promise<string[]> {
    const prompt = `List the top 5 answers or answer strategies that would help a candidate prepare for the following interview question: "${question}". Respond as a JSON object with a property 'suggested_answers' containing an array of strings.`;
    try {
      const response = await this.callOpenAI(prompt, technique, {
        temperature,
      });
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
