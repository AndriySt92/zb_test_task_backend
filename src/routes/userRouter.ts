import express from "express";
import UserController from '../controllers/userController.ts'
import { loginValidation, registerValidation } from "../helpers/authValidation.ts";
import { authenticateToken } from "../middleware/authenticate.ts";

const router = express.Router();

router.post('/register', registerValidation, UserController.register)
router.post('/login', loginValidation, UserController.login)
router.get('/current', authenticateToken, UserController.current)

export default router