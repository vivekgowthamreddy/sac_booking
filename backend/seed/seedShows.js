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
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing shows
    await Show.deleteMany({});
    console.log('🗑️  Cleared existing shows');

    // Seed sample shows
    const shows = [
      {
        movie: 'Avengers',
        date: '2025-12-15',
        time: '18:00',
        allowedGender: 'male',
        rows: 10,
        cols: 10
      },
      {
        movie: 'Barbie',
        date: '2025-12-16',
        time: '19:00',
        allowedGender: 'female',
        rows: 10,
        cols: 10
      },
      {
        movie: 'Leo',
        date: '2025-12-17',
        time: '20:00',
        allowedGender: 'male',
        rows: 10,
        cols: 10
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
    console.error('❌ Seeding error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedShows();


