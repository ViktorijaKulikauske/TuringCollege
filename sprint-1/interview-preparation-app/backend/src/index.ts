import express from "express";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(errorHandler);
