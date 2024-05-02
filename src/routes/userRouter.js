import express from "express";
import UserController from '../controllers/userController.js'
import { loginValidation, registerValidation } from "../helpers/authValidation.js";
import { authenticateToken } from "../middleware/authenticate.js";

const router = express.Router();

router.post('/register', registerValidation, UserController.register)
router.post('/login', loginValidation, UserController.login)
router.get('/current', authenticateToken, UserController.current)

export default router