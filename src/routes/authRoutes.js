import express from 'express';
import { login, updatePassword } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/update-password', authMiddleware, updatePassword);

export default router;