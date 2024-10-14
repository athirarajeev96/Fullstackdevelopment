import express from 'express';
import Schedule from '../models/Schedule.js';

const router = express.Router();
// Create a new schedule
router.post('/', async (req, res) => {
  const { name, classId, type, duration, date, time } = req.body;

  if (!name || !classId || !type || !duration || !date || !time) {
    return res.status(400).json({ message: 'Please provide name, classId, type, duration, date, and time' });
  }

  try {
    const schedule = new Schedule({
      name,
      classId,
      type,
      duration,
      date,
      time
    });
  
    await schedule.save();
    res.status(201).json({ message: 'Class scheduled successfully!', schedule });
  } catch(error) {
    console.error("Error creating schedule: ", error);
    res.status(500).json({ message: 'Error scheduling class' });
  }
});

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules: ", error);
    res.status(500).json({ message: 'Error fetching schedules' });
  }
});

// Get a specific schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching schedule: ", error);
    res.status(500).json({ message: 'Error fetching schedule' });
  }
});




// Update a schedule
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, classId, type, duration, date, time } = req.body;

  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { name, classId, type, duration, date, time },
      { new: true, runValidators: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
  } catch (error) {
    console.error("Error updating schedule: ", error);
    res.status(500).json({ message: 'Error updating schedule' });
  }
});
export default router;