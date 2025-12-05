const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Middleware to verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Authorization header must be: Bearer <token>' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user info to request
      req.user = {
        id: decoded.id,
        email: decoded.email,
        gender: decoded.gender,
        role: decoded.role || 'student'
      };

      // Verify principal exists based on role
      if (req.user.role === 'admin') {
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
          return res.status(401).json({ message: 'Admin not found' });
        }
      } else {
        const user = await Student.findById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
      }

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      throw error;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Authentication error' });
  }
};

// Middleware to check if user is admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

module.exports = { authenticate, authorizeAdmin, JWT_SECRET };

