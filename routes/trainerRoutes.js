import express from 'express';
import { 
    createTrainer,
    getAllTrainersHandler,
    getTrainerById, 
    updateTrainer, 
    setAvailability,
    deleteTrainer
} from '../controllers/trainerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST to create a trainer (authentication required)
router.post('/', authMiddleware, createTrainer);

// GET all trainers (no authentication required)
router.get('/', getAllTrainersHandler);

// GET a specific trainer by ID
router.get('/:id', getTrainerById);

// PUT to update trainer profile
router.put('/:id', authMiddleware, updateTrainer);

// PUT to set availability for a trainer
router.put('/:id/availability', authMiddleware, setAvailability);

// DELETE a trainer
router.delete('/:id', authMiddleware, deleteTrainer);

export default router;