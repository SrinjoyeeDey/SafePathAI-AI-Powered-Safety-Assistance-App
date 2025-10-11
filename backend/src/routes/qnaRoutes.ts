import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth";
import { listQuestions, createQuestion, addAnswer, upvoteAnswer, acceptAnswer, downvoteAnswer } from "../controllers/qnaController";

const router = Router();

router.get("/", listQuestions);
router.post("/", verifyAccessToken, createQuestion);
router.post("/:id/answers", verifyAccessToken, addAnswer);
router.post("/:id/answers/:answerId/upvote", verifyAccessToken, upvoteAnswer);
router.post("/:id/answers/:answerId/downvote", verifyAccessToken, downvoteAnswer);
router.post("/:id/answers/:answerId/accept", verifyAccessToken, acceptAnswer);

export default router;


