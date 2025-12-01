const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Show = require('../models/Show');

// GET /api/shows - Get shows filtered by user's gender
router.get('/', authenticate, async (req, res) => {
  try {
    // CRUCIAL: Only return shows matching the logged-in user's gender
    const shows = await Show.find({ allowedGender: req.user.gender });
    
    res.json({
      message: 'Shows retrieved successfully',
      shows: shows
    });
  } catch (error) {
    console.error('Get shows error:', error);
    res.status(500).json({ message: 'Failed to retrieve shows', error: error.message });
  }
});

module.exports = router;



