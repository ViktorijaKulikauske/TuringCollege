"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setOpenAIRoutes;
const express_1 = require("express");
const openai_controller_1 = __importDefault(require("../controllers/openai.controller"));
const router = (0, express_1.Router)();
const openAIController = new openai_controller_1.default();
router.post("/generate-response", openAIController.generateResponse);
router.get("/categories", openAIController.getProfessionCategories);
function setOpenAIRoutes(app) {
    app.use("/api/openai", router);
}
