const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student ID is required'],
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: [true, 'Show ID is required'],
  },
  seatNumber: {
    type: String,
    required: [true, 'Seat number is required'],
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

// Prevent duplicate bookings for same seat in same show
bookingSchema.index({ showId: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);



