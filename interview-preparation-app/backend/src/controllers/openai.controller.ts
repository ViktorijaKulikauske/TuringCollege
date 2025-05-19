import { Request, Response } from "express";
import { OpenAIService, PromptTechnique } from "../services/openai.service";

class OpenAIController {
  constructor(private openAIService: OpenAIService) {}

  public async generateResponse(req: Request, res: Response): Promise<void> {
    const { prompt } = req.body;

    try {
      const response = await this.openAIService.callOpenAI(prompt);
      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while generating the response." });
    }
  }

  public async getProfessionCategories(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const categories = await this.openAIService.getMainProfessionCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching profession categories:", error);
      res.status(500).json({ error: "Failed to fetch profession categories." });
    }
  }

  public async getPositionsByCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    const category = req.query.category as string;
    if (!category) {
      res.status(400).json({ error: "Category parameter is required." });
      return;
    }
    try {
      const positions = await this.openAIService.getPositionsByCategory(
        category
      );
      res.status(200).json(positions);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch positions for category." });
    }
  }

  public async getInterviewPrepByPosition(
    req: Request,
    res: Response
  ): Promise<void> {
    const position = req.query.position as string;
    const technique = (req.query.technique as PromptTechnique) || "zero-shot";
    const temperature = req.query.temperature
      ? Number(req.query.temperature)
      : 0;
    if (!position) {
      res.status(400).json({ error: "Position parameter is required." });
      return;
    }
    try {
      const prep = await this.openAIService.getInterviewPrepByPosition(
        position,
        technique,
        temperature
      );
      res.status(200).json(prep);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch interview preparation for position." });
    }
  }

  public async getSuggestedAnswersByPosition(
    req: Request,
    res: Response
  ): Promise<void> {
    const question = req.query.position as string;
    const technique = (req.query.technique as PromptTechnique) || "zero-shot";
    const temperature = req.query.temperature
      ? Number(req.query.temperature)
      : 0;
    if (!question) {
      res.status(400).json({ error: "Question parameter is required." });
      return;
    }
    try {
      const answers = await this.openAIService.getSuggestedAnswersByQuestion(
        question,
        technique,
        temperature
      );
      res.status(200).json(answers);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch suggested answers for question." });
    }
  }
}

export default OpenAIController;
