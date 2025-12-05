const mongoose = require('mongoose');
const Show = require('../models/Show');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sac-booking';

const seedShows = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing shows
    await Show.deleteMany({});
    console.log('🗑️  Cleared existing shows');

    // Seed shows
    const shows = [
      {
        movie: 'Inception',
        date: '2025-12-01',
        time: '18:00',
        allowedGender: 'male',
        rows: 10,
        cols: 10
      },
      {
        movie: 'The Dark Knight',
        date: '2025-12-02',
        time: '19:30',
        allowedGender: 'male',
        rows: 10,
        cols: 10
      },
      {
        movie: 'Interstellar',
        date: '2025-12-03',
        time: '17:00',
        allowedGender: 'male',
        rows: 10,
        cols: 10
      },
      {
        movie: 'La La Land',
        date: '2025-12-01',
        time: '18:00',
        allowedGender: 'female',
        rows: 10,
        cols: 10
      },
      {
        movie: 'The Greatest Showman',
        date: '2025-12-02',
        time: '19:00',
        allowedGender: 'female',
        rows: 10,
        cols: 10
      },
      {
        movie: 'Frozen',
        date: '2025-12-03',
        time: '16:30',
        allowedGender: 'female',
        rows: 10,
        cols: 10
      }
    ];

    await Show.insertMany(shows);
    console.log(`✅ Seeded ${shows.length} shows successfully`);

    // Display seeded shows
    const allShows = await Show.find({});
    console.log('\n📋 Seeded Shows:');
    allShows.forEach(show => {
      console.log(`  - ${show.movie} (${show.allowedGender}) - ${show.date} ${show.time}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedShows();



