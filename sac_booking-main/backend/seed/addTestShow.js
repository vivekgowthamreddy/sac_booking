const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Show = require('../models/Show');

const MONGO_URI = process.env.MONGO_URI;

const addTestShow = async () => {
    try {
        if (!MONGO_URI || MONGO_URI === '<placeholder_for_atlas_url>') {
            console.error('❌ MONGO_URI is not set in .env file');
            process.exit(1);
        }

        console.log('🔌 Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // Add a test show with damaged seats in Row-Seat format
        const testShow = {
            movie: 'All Seats Available - Test',
            date: '2025-12-20',
            time: '15:00',
            allowedGender: 'male',
            rows: 3,
            cols: 6,
            damagedSeats: []
        };

        const show = await Show.create(testShow);
        console.log('✅ Test show created successfully');
        console.log(`   Movie: ${show.movie}`);
        console.log(`   Date: ${show.date} ${show.time}`);
        console.log(`   Gender: ${show.allowedGender}`);
        console.log(`   Rows: ${show.rows}, Cols: ${show.cols}`);

        await mongoose.connection.close();
        console.log('\n✅ Done!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

addTestShow();
