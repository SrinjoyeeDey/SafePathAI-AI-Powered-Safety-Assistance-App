import { Router } from "express";
import {queryAI} from '../controllers/aiController'

const router=Router()

router.post("/query",queryAI);

export default router;