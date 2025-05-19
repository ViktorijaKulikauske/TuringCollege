import { Application, Router } from "express";
import OpenAIController from "../controllers/openai.controller";
import { OpenAIService } from "../services/openai.service";

const router = Router();
const openAIService = new OpenAIService();
const openAIController = new OpenAIController(openAIService);

router.post(
  "/generate-response",
  openAIController.generateResponse.bind(openAIController)
);
router.get(
  "/categories",
  openAIController.getProfessionCategories.bind(openAIController)
);
router.get(
  "/positions",
  openAIController.getPositionsByCategory.bind(openAIController)
);
router.get(
  "/interview-prep",
  openAIController.getInterviewPrepByPosition.bind(openAIController)
);
router.get(
  "/suggested-answers",
  openAIController.getSuggestedAnswersByPosition.bind(openAIController)
);
router.post("/interview-simulator", async (req, res) => {
  try {
    const { history, persona, position, technique, temperature } = req.body;
    // history: [{role: 'user'|'assistant', content: string}]
    // persona: e.g. 'strict', 'friendly', 'neutral'
    // position: job position string
    // technique: PromptTechnique
    // temperature: number

    let personaPrompt = "";
    if (persona === "strict") personaPrompt = "Act as a strict interviewer.";
    else if (persona === "friendly")
      personaPrompt = "Act as a friendly interviewer.";
    else personaPrompt = "Act as a neutral interviewer.";

    const systemPrompt = `${personaPrompt} You are interviewing a candidate for the position of "${position}". Ask one question at a time and wait for the user's answer. ${
      technique ? "Prompt technique: " + technique + "." : ""
    } Always respond in JSON format as requested.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(Array.isArray(history) ? history : []),
    ];

    const response = await openAIService.openai.chat.completions.create({
      model: "gpt-4o",
      temperature: typeof temperature === "number" ? temperature : 0,
      max_tokens: 400,
      response_format: { type: "json_object" },
      messages,
    });
    const { content } = response.choices[0].message;
    res.status(200).json(JSON.parse(content as string));
  } catch (error) {
    res.status(500).json({ error: "Interview simulator failed." });
  }
});

export default function setOpenAIRoutes(app: Application) {
  app.use("/api/openai", router);
}
