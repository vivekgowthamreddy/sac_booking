const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');
const { forgotPassword, resetPassword, changePassword } = require('../controllers/passwordController');
const Admin = require('../models/Admin');
const { JWT_SECRET, authenticate } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

// POST /api/auth/change-password (requires authentication)
router.post('/change-password', authenticate, changePassword);

// POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Admin login successful',
            token,
            user: {
                id: admin._id,
                username: admin.username,
                role: 'admin'
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;



