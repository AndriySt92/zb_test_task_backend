import express from 'express'
import DealsController from '../controllers/dealsController.ts'
import { authenticateToken } from '../middleware/authenticate.ts'

const router = express.Router()

router.get('/', authenticateToken, DealsController.getAll)

export default router
