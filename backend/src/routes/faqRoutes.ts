import { Router } from "express";
import { listFAQs } from "../controllers/faqController";

const router = Router();

router.get("/", listFAQs);

export default router;


