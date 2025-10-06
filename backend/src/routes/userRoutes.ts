import { Router } from "express";
import { me, updateLocation } from "../controllers/userController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/me", authenticate, me);
router.patch("/me/location", authenticate, updateLocation);

export default router;
