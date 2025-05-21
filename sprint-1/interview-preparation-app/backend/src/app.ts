import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { rateLimitGuard } from "./middleware/rateLimit.middleware";
import setOpenAIRoutes from "./routes/openai.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimitGuard); // Use the middleware directly

setOpenAIRoutes(app);

app.get("/", (req, res) => {
  res.send("Welcome to the Interview Preparation App Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
