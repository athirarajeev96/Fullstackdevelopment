import Trainer from '../models/Trainer.js';

// Create a new trainer
export const createTrainer = async (req, res) => {
  const { name, qualifications, expertise, profilePhoto, introVideo, description, availability } = req.body;

  try {
    const newTrainer = new Trainer({ name, qualifications, expertise, profilePhoto, introVideo, description, availability });
    await newTrainer.save();

    res.status(201).json(newTrainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainers = async () => {
  try {
    const trainers = await Trainer.find().select('_id name'); // Only return _id and name
    return trainers;
  } catch (error) {
    throw error;
  }
};

export const deleteTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const deletedTrainer = await Trainer.findByIdAndDelete(trainerId);
    
    if (!deletedTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trainer", error: error.message });
  }
};

export const getAllTrainersHandler = async (req, res) => {
  try {
    const trainers = await Trainer.find(); // Get all trainer data
    res.status(200).json(trainers);
  } catch (error) {
    console.error('Error in getAllTrainersHandler:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a specific trainer by ID
export const getTrainerById = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update trainer profile
export const updateTrainer = async (req, res) => {
  const { id } = req.params;
  const { name, qualifications, expertise, bio } = req.body;

  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    trainer.name = name || trainer.name;
    trainer.qualifications = qualifications || trainer.qualifications;
    trainer.expertise = expertise || trainer.expertise;
    trainer.bio = bio || trainer.bio;
    await trainer.save();

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set availability for a trainer
export const setAvailability = async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    trainer.availability = availability;
    await trainer.save();

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};