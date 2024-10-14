import express from 'express';
import { createFeedback, getFeedback } from '../controllers/feedbackController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit Feedback
router.post('/create', authMiddleware, async (req, res) => {
  const { trainerName, rating, comment } = req.body;

  // Validate input
  if (!trainerName || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate rating range
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
  }

  try {
    const newFeedback = await createFeedback(trainerName, rating, comment);
    return res.status(201).json({ message: 'Feedback submitted successfully!', feedback: newFeedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return res.status(500).json({ message: 'Error submitting feedback.', error: error.message });
  }
});

// Get All Feedbacks for a Trainer by Name
router.get('/trainer/:trainerName', async (req, res) => {
  const { trainerName } = req.params;

  try {
    const feedbacks = await Feedback.find({ trainerName });
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return res.status(500).json({ message: 'Error fetching feedbacks.', error: error.message });
  }
});

export default router;