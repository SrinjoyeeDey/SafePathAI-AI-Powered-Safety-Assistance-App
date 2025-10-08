import { Router } from "express";

import { handleChatbotQuery } from '../controllers/chatbotController';

const router=Router()


router.post('/query', handleChatbotQuery);

export default router;