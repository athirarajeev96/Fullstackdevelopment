import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // Change according to your requirement
  date: { type: Date, required: true },
  time: { type: String, required: true }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;
