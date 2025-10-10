import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth";
import { createCheckIn, confirmCheckIn, listMyCheckIns } from "../controllers/checkInController";

const router = Router();

router.post("/", verifyAccessToken, createCheckIn);
router.post("/:id/confirm", verifyAccessToken, confirmCheckIn);
router.get("/me", verifyAccessToken, listMyCheckIns);

export default router;
