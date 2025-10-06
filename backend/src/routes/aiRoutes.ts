import { Router } from "express";
import { queryAI } from "../controllers/aiController";
import { validateAIChat, validatePagination } from "../middleware/validationMiddleware";
import { aiChatLimiter } from "../middleware/rateLimitMiddleware";

const router = Router();

router.post("/chat", aiChatLimiter, validateAIChat, queryAI);
// (optional) only if you later add chat history endpoint:
router.get("/history", validatePagination, (req, res) => res.send("Chat history endpoint placeholder"));

export default router;
