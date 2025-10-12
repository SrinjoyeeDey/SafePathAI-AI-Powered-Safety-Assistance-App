import { Router } from "express";
import { signup, login, refresh, logout, forgotPassword, resetPassword, updatePassword } from "../controllers/authController";
import { verifyAccessToken } from "../middleware/auth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-password", verifyAccessToken, updatePassword);

export default router;