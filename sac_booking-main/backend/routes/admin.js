const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const Student = require('../models/Student');
const Show = require('../models/Show');
const Booking = require('../models/Booking');
const DamageReport = require('../models/DamageReport');

// Middleware to ensure user is admin
router.use(authenticate, authorizeAdmin);

// GET /api/admin/stats - Get dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const totalShows = await Show.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalStudents = await Student.countDocuments();
        const damageReports = await DamageReport.countDocuments({ status: 'pending' });

        res.json({
            totalShows,
            totalBookings,
            totalStudents,
            pendingDamageReports: damageReports
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ message: 'Failed to retrieve stats' });
    }
});

// GET /api/admin/bookings - Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('studentId', 'name rollNumber email gender')
            .populate('showId', 'movie date time')
            .sort({ timestamp: -1 });

        res.json({ bookings });
    } catch (error) {
        console.error('Admin bookings error:', error);
        res.status(500).json({ message: 'Failed to retrieve bookings' });
    }
});

// GET /api/admin/damage-reports - Get all damage reports
router.get('/damage-reports', async (req, res) => {
    try {
        const reports = await DamageReport.find()
            .populate('showId', 'movie date time')
            .sort({ createdAt: -1 });

        res.json({ reports });
    } catch (error) {
        console.error('Admin damage reports error:', error);
        res.status(500).json({ message: 'Failed to retrieve damage reports' });
    }
});

// POST /api/admin/damage-reports - Create a damage report
router.post('/damage-reports', async (req, res) => {
    try {
        const { seatId, showId, description, photoUrl } = req.body;

        const report = new DamageReport({
            seatId,
            showId,
            description,
            photoUrl,
            reportedBy: 'admin',
            status: 'pending'
        });

        await report.save();
        res.status(201).json({ message: 'Damage report created', report });
    } catch (error) {
        console.error('Create damage report error:', error);
        res.status(500).json({ message: 'Failed to create damage report' });
    }
});

module.exports = router;
