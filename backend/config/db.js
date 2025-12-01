const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI || MONGO_URI === '<placeholder_for_atlas_url>') {
      console.error('❌ MONGO_URI is not set in .env file');
      console.error('Please add your MongoDB Atlas connection string to the .env file');
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


