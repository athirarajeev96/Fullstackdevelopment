import Feedback from '../models/Feedback.js';
import Trainer from '../models/Trainer.js';

export const createFeedback = async (trainerName, rating, comment) => {
  try {
    // Check if the trainer exists
    const trainer = await Trainer.findOne({ name: trainerName });
    if (!trainer) {
      throw new Error('Trainer not found');
    }

    // Create the feedback with trainerName, rating, and comment
    const feedback = new Feedback({
      trainerName,
      rating,
      comment,
    });

    // Save the feedback to the database
    await feedback.save();
    return feedback;
  } catch (error) {
    throw error;
  }
};

export const getFeedback = async () => {
  try {
    // Fetch all feedbacks
    const feedbacks = await Feedback.find().exec();
    return feedbacks;
  } catch (error) {
    throw error;
  }
};