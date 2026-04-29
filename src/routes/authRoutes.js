import express from 'express';
import { login, updatePassword } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);
// A rota fica protegida pelo middleware e executa o controller
router.post('/update-password', authMiddleware, updatePassword);

export default router;