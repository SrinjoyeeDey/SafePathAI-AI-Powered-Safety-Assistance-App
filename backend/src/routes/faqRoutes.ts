import { Router } from "express";
import { listFAQs, seedDefaultFAQs } from "../controllers/faqController";

const router = Router();

router.get("/", listFAQs);
router.post("/seed", seedDefaultFAQs);

export default router;


