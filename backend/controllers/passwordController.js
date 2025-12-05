const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Student = require('../models/Student');

// Forgot Password - Generate reset token
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if email is in correct format
        if (!email.endsWith('@rguktn.ac.in')) {
            return res.status(400).json({ message: 'Email must end with @rguktn.ac.in' });
        }

        // Find user by email
        const student = await Student.findOne({ email: email.toLowerCase() });
        if (!student) {
            // Don't reveal if user exists or not for security
            return res.json({
                message: 'If an account exists with this email, a password reset token has been generated.',
                success: true
            });
        }

        // Generate reset token (6-digit code for simplicity)
        const resetToken = crypto.randomInt(100000, 999999).toString();

        // Hash the token before saving
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Save hashed token and expiration (15 minutes)
        student.resetPasswordToken = hashedToken;
        student.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
        await student.save();

        // In production, you would send this via email
        // For development, we return it in the response
        res.json({
            message: 'Password reset token generated successfully',
            success: true,
            // Remove this in production - only for development
            resetToken: resetToken,
            expiresIn: '15 minutes'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Failed to process request', error: error.message });
    }
};

// Reset Password - Verify token and update password
const resetPassword = async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;

        // Validate input
        if (!email || !token || !newPassword) {
            return res.status(400).json({ message: 'Email, token, and new password are required' });
        }

        // Validate password strength
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Hash the provided token to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find user with valid reset token
        const student = await Student.findOne({
            email: email.toLowerCase(),
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!student) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password
        const saltRounds = 10;
        student.passwordHash = await bcrypt.hash(newPassword, saltRounds);

        // Clear reset token fields
        student.resetPasswordToken = undefined;
        student.resetPasswordExpires = undefined;

        await student.save();

        res.json({
            message: 'Password has been reset successfully',
            success: true
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Failed to reset password', error: error.message });
    }
};

// Change Password - For authenticated users
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // req.user is set by auth middleware
        const userId = req.user.id;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }

        // Validate new password strength
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }

        // Check if new password is different from current
        if (currentPassword === newPassword) {
            return res.status(400).json({ message: 'New password must be different from current password' });
        }

        // Find user
        const student = await Student.findById(userId);
        if (!student) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isPasswordValid = await student.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash and save new password
        const saltRounds = 10;
        student.passwordHash = await bcrypt.hash(newPassword, saltRounds);
        await student.save();

        res.json({
            message: 'Password changed successfully',
            success: true
        });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Failed to change password', error: error.message });
    }
};

module.exports = { forgotPassword, resetPassword, changePassword };
