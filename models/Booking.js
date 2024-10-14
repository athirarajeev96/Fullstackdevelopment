import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ensure this refers to your User model
        required: true // This should be required
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer', // Ensure this refers to your Trainer model
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class', // Ensure this refers to your Class model
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
