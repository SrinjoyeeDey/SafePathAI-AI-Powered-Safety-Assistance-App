import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth";
import { listQuestions, createQuestion, addAnswer, upvoteAnswer, acceptAnswer, downvoteAnswer } from "../controllers/qnaController";

const router = Router();

// Public routes (no authentication required)
router.get("/", listQuestions);

// Apply authentication to all remaining routes
router.use(verifyAccessToken);

// Protected routes (authentication applied via router.use above)
router.post("/", createQuestion);
router.post("/:id/answers", addAnswer);
router.post("/:id/answers/:answerId/upvote", upvoteAnswer);
router.post("/:id/answers/:answerId/downvote", downvoteAnswer);
router.post("/:id/answers/:answerId/accept", acceptAnswer);

export default router;


