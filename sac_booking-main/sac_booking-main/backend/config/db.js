const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI || MONGO_URI === '<placeholder_for_atlas_url>') {
      console.warn('⚠️  MONGO_URI is not set in .env file');
      console.warn('   Server will start but database features will not work');
      console.warn('   Please add your MongoDB Atlas connection string to the .env file');
      return; // Don't exit, just return
    }

    await mongoose.connect(MONGO_URI);

    console.log('✅ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.warn('⚠️  Server will continue without database');
    console.warn('   Please check:');
    console.warn('   1. MongoDB Atlas Network Access (IP whitelist)');
    console.warn('   2. Connection string in .env file');
    // Don't exit - allow server to start anyway
  }
};

module.exports = connectDB;


