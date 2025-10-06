import { Router } from "express";
import { signup, login, refresh, logout } from "../controllers/authController";
import { validateSignup, validateLogin } from "../middleware/validationMiddleware";
import { authLimiter, signupLimiter } from "../middleware/rateLimitMiddleware";

const router = Router();

router.post("/signup", signupLimiter, validateSignup, signup);
router.post("/login", authLimiter, validateLogin, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
