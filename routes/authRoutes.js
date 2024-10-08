// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/', loginUser);

export default router;