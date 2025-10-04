import {Router} from 'express'
import { nearby } from '../controllers/placesController'

const router=Router()

router.get("/nearby",nearby);

export default router;