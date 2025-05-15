import { Request, Response } from "express";
import { OpenAIService } from "../services/openai.service";

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
      console.error("Error fetching profession categories:", error); // Log the error
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
      const positions = await this.openAIService.getPositionsByCategory(category);
      res.status(200).json(positions);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch positions for category." });
    }
  }
}

export default OpenAIController;
