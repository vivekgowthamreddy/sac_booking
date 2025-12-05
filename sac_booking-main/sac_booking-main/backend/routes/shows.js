const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Show = require('../models/Show');
const Booking = require('../models/Booking');

// GET /api/shows - Get shows filtered by user's gender
router.get('/', authenticate, async (req, res) => {
  try {
    // CRUCIAL: Only return shows matching the logged-in user's gender
    const shows = await Show.find({ allowedGender: req.user.gender });

    // Calculate booked count for each show
    const showsWithCount = await Promise.all(shows.map(async (show) => {
      const bookedCount = await Booking.countDocuments({ showId: show._id });
      return {
        ...show.toObject(),
        bookedCount
      };
    }));

    res.json({
      message: 'Shows retrieved successfully',
      shows: showsWithCount
    });
  } catch (error) {
    console.error('Get shows error:', error);
    res.status(500).json({ message: 'Failed to retrieve shows', error: error.message });
  }
});

// GET /api/shows/:id/seats - Get booked seats for a show
router.get('/:id/seats', authenticate, async (req, res) => {
  try {
    const showId = req.params.id;

    // Find all bookings for this show
    const bookings = await Booking.find({ showId }).select('seatNumber');

    // Extract seat numbers
    const bookedSeats = bookings.map(b => b.seatNumber);

    res.json({
      message: 'Seats retrieved successfully',
      bookedSeats
    });
  } catch (error) {
    console.error('Get seats error:', error);
    res.status(500).json({ message: 'Failed to retrieve seats', error: error.message });
  }
});

module.exports = router;



