import { Router } from "express";
import {me,updateLocation} from '../controllers/userController'
import {verifyAccessToken} from '../middleware/auth'

const router=Router();

router.get("/me",verifyAccessToken,me);
router.patch("/me/location",verifyAccessToken,updateLocation);

export default router;