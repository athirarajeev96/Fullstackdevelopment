import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  trainerName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;