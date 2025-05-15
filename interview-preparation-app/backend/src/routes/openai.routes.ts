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

export default function setOpenAIRoutes(app: Application) {
  app.use("/api/openai", router);
}
