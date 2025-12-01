const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Show = require('../models/Show');
const Booking = require('../models/Booking');

// POST /api/book - Create a booking
router.post('/', authenticate, async (req, res) => {
  try {
    const { showId, seatNumber } = req.body;

    // Validate required fields
    if (!showId || !seatNumber) {
      return res.status(400).json({ message: 'Show ID and seat number are required' });
    }

    // Find the show
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // CRUCIAL: Enforce gender-based access control
    if (show.allowedGender !== req.user.gender) {
      return res.status(403).json({ message: 'Not allowed to book this show' });
    }

    // Check if seat is already booked
    const existingBooking = await Booking.findOne({ showId, seatNumber });
    if (existingBooking) {
      return res.status(409).json({ message: 'Seat is already booked' });
    }

    // Validate seat number format (e.g., A1, B5, etc.)
    const seatRegex = /^[A-Z]\d+$/;
    if (!seatRegex.test(seatNumber)) {
      return res.status(400).json({ message: 'Invalid seat number format. Use format like A1, B5, etc.' });
    }

    // Extract row and column from seat number
    const row = seatNumber.charAt(0);
    const col = parseInt(seatNumber.substring(1));

    // Validate seat is within show capacity
    if (row.charCodeAt(0) - 65 >= show.rows || col < 1 || col > show.cols) {
      return res.status(400).json({ message: 'Seat number is out of range' });
    }

    // Create booking
    const booking = new Booking({
      studentId: req.user.id,
      showId,
      seatNumber,
    });

    await booking.save();

    // Populate show details for response
    await booking.populate('showId', 'movie date time allowedGender');

    res.status(201).json({
      message: 'Booking successful',
      booking: {
        id: booking._id,
        showId: booking.showId,
        seatNumber: booking.seatNumber,
        timestamp: booking.timestamp,
        show: booking.showId
      }
    });
  } catch (error) {
    console.error('Booking error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Seat is already booked' });
    }
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});

// GET /api/book/my-bookings - Get user's bookings
router.get('/my-bookings', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.user.id })
      .populate('showId', 'movie date time allowedGender')
      .sort({ timestamp: -1 });

    res.json({
      message: 'Bookings retrieved successfully',
      bookings: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
  }
});

module.exports = router;



