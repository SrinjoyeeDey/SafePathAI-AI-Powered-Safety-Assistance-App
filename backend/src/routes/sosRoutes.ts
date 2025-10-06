import { Router } from "express";
import { sendSOS } from "../controllers/sosController";
import { authenticate } from "../middleware/auth"; // ✅ correct filename
import { validateSOSAlert } from "../middleware/validationMiddleware";
import { sosLimiter } from "../middleware/rateLimitMiddleware";

const router = Router();

router.post("/", authenticate, sosLimiter, validateSOSAlert, sendSOS);

export default router;
