const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Show = require('../models/Show');

const MONGO_URI = process.env.MONGO_URI;

const seedShows = async () => {
  try {
    // Check if MONGO_URI is set
    if (!MONGO_URI || MONGO_URI === '<placeholder_for_atlas_url>') {
      console.error('❌ MONGO_URI is not set in .env file');
      console.error('Please add your MongoDB Atlas connection string to the .env file');
      process.exit(1);
    }

    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing shows
    await Show.deleteMany({});
    console.log('🗑️  Cleared existing shows');

    // Damaged seats from SAC Auditorium layout (using Row-Seat format)
    const damagedSeats = ['A-1', 'A-10', 'B-5', 'B-15', 'E-7', 'G-12', 'G-13', 'H-4', 'J-18', 'K-2', 'K-11', 'M-9'];

    // Seed sample shows with SAC Auditorium layout
    // Rows A-L: 38 seats each (19 + 19 with STEPS gap)
    // Rows M-R: 34 seats each (17 + 17 with CABIN gap)
    const shows = [
      {
        movie: 'Avengers: Endgame',
        date: '2025-12-15',
        time: '18:00',
        allowedGender: 'male',
        rows: 18,  // A-R (18 rows total)
        cols: 38,  // Maximum seats per row (rows A-L have 38)
        damagedSeats
      },
      {
        movie: 'Barbie',
        date: '2025-12-16',
        time: '19:00',
        allowedGender: 'female',
        rows: 18,  // A-R (18 rows total)
        cols: 38,  // Maximum seats per row (rows A-L have 38)
        damagedSeats
      },
      {
        movie: 'Leo',
        date: '2025-12-17',
        time: '20:00',
        allowedGender: 'male',
        rows: 18,  // A-R (18 rows total)
        cols: 38,  // Maximum seats per row (rows A-L have 38)
        damagedSeats
      }
    ];

    await Show.insertMany(shows);
    console.log(`✅ Successfully seeded ${shows.length} shows`);

    // Display seeded shows
    const allShows = await Show.find({});
    console.log('\n📋 Seeded Shows:');
    allShows.forEach(show => {
      console.log(`  • ${show.movie} (${show.allowedGender}) - ${show.date} ${show.time}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    if (error.code) console.error('Error Code:', error.code);
    if (error.codeName) console.error('Error CodeName:', error.codeName);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedShows();


