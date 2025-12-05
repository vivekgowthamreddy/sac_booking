const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./backend/config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/shows', require('./backend/routes/shows'));
app.use('/api/book', require('./backend/routes/booking'));
app.use('/api/admin', require('./backend/routes/admin'));
app.use('/api/tickets', require('./backend/routes/tickets'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SAC Booking API is running' });
});

// Database test route
app.get('/api/db-test', (req, res) => {
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState === 1) {
    res.json({ success: true, message: 'MongoDB connection working' });
  } else {
    res.status(500).json({ success: false, message: 'MongoDB not connected' });
  }
});

// Global JSON error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  const message = err.message || 'Server error';
  res.status(status).json({ message });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    // Don't exit - server can still run without database
  }
};

startServer();
