import express from 'express';
import { updatePassword } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// A rota fica protegida pelo middleware e executa o controller
router.post('/update-password', authMiddleware, updatePassword);

export default router;