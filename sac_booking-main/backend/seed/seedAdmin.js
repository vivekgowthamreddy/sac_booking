const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const Admin = require('../models/Admin');

const MONGO_URI = process.env.MONGO_URI;

const seedAdmin = async () => {
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

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('ℹ️  Admin account already exists');
            await mongoose.connection.close();
            process.exit(0);
        }

        // Create admin account
        const password = 'admin123'; // Default password for testing
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const admin = new Admin({
            username: 'admin',
            passwordHash
        });

        await admin.save();
        console.log('✅ Admin account created successfully');
        console.log('📋 Credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        console.log('⚠️  Change the password in production!');

        await mongoose.connection.close();
        console.log('\n✅ Admin seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        if (error.code) console.error('Error Code:', error.code);
        if (error.codeName) console.error('Error CodeName:', error.codeName);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedAdmin();
