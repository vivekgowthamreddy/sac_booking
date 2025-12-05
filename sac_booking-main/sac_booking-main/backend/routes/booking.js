const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { createTicket } = require('../services/ticketService');
const Show = require('../models/Show');
const Booking = require('../models/Booking');
const { cancelTicketByBookingId } = require('../services/ticketService');

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

    // CRUCIAL: Check if student already has a booking for this show (one seat per email per show)
    const existingStudentBooking = await Booking.findOne({
      studentId: req.user.id,
      showId
    });
    if (existingStudentBooking) {
      return res.status(409).json({
        message: 'You have already booked a seat for this show. Only one seat per student is allowed.'
      });
    }

    // Check if seat is already booked
    const existingBooking = await Booking.findOne({ showId, seatNumber });
    if (existingBooking) {
      return res.status(409).json({ message: 'Seat is already booked' });
    }

    // Validate seat number format (e.g., A-1, B-5, etc. with hyphen)
    const seatRegex = /^[A-R]-\d+$/;
    if (!seatRegex.test(seatNumber)) {
      return res.status(400).json({ message: 'Invalid seat number format. Use format like A-1, B-5, etc.' });
    }

    // Check if seat is damaged
    if (show.damagedSeats && show.damagedSeats.includes(seatNumber)) {
      return res.status(400).json({ message: 'This seat is damaged and cannot be booked' });
    }

    // Extract row and column from seat number (format: A-1)
    const [row, colStr] = seatNumber.split('-');
    const col = parseInt(colStr);

    // Validate seat is within show capacity
    const rowIndex = row.charCodeAt(0) - 65; // A=0, B=1, etc.

    // Check row validity (A-R = 0-17)
    if (rowIndex < 0 || rowIndex >= show.rows) {
      return res.status(400).json({ message: 'Seat row is out of range' });
    }

    // Check column validity based on row
    // Rows A-L (0-11): 38 seats max
    // Rows M-R (12-17): 34 seats max
    const maxSeats = rowIndex <= 11 ? 38 : 34;
    if (col < 1 || col > maxSeats) {
      return res.status(400).json({ message: `Seat number is out of range for row ${row}. Maximum is ${maxSeats}.` });
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

    // Issue compact signed ticket and QR
    const ticket = await createTicket({ eventId: String(booking.showId._id || booking.showId), userId: String(booking.studentId), metadata: { bookingId: String(booking._id) } });

    res.status(201).json({
      message: 'Booking successful',
      booking: {
        id: booking._id,
        showId: booking.showId,
        seatNumber: booking.seatNumber,
        timestamp: booking.timestamp,
        show: booking.showId,
        ticketId: ticket.ticketId,
        qrDataUri: ticket.qrDataUri,
        token: ticket.token,
        validationUrl: ticket.validationUrl
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

// DELETE /api/book/:id - Cancel a booking (student-owned)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only the owner can cancel
    if (String(booking.studentId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    await Booking.deleteOne({ _id: bookingId });
    await cancelTicketByBookingId(String(bookingId));

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
});

