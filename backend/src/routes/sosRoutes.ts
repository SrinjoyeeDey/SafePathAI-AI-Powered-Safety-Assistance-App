import { Router } from "express";
import { sendSOS } from "../controllers/sosController";
import { authenticate } from "../middleware/auth";

const router = Router();

// POST /api/sos
router.post("/", authenticate, sendSOS);

export default router;
