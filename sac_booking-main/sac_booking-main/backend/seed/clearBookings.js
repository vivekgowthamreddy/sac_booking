const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Booking = require('../models/Booking');

const MONGO_URI = process.env.MONGO_URI;

const clearBookings = async () => {
    try {
        // Check if MONGO_URI is set
        if (!MONGO_URI || MONGO_URI === '<placeholder_for_atlas_url>') {
            console.error('❌ MONGO_URI is not set in .env file');
            process.exit(1);
        }

        // Connect to MongoDB
        console.log('🔌 Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // Clear all bookings
        const result = await Booking.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} bookings`);

        await mongoose.connection.close();
        console.log('✅ All bookings cleared successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

clearBookings();
