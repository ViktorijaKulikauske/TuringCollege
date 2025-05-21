"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_service_1 = require("../services/openai.service");
class OpenAIController {
    constructor() {
        this.openAIService = new openai_service_1.OpenAIService();
    }
    generateResponse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { prompt } = req.body;
            try {
                const response = yield this.openAIService.callOpenAI(prompt);
                res.status(200).json(response);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "An error occurred while generating the response." });
            }
        });
    }
    getProfessionCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.openAIService.getMainProfessionCategories();
                res.status(200).json(categories);
            }
            catch (error) {
                console.error("Error fetching profession categories:", error); // Log the error
                res.status(500).json({ error: "Failed to fetch profession categories." });
            }
        });
    }
}
exports.default = OpenAIController;
