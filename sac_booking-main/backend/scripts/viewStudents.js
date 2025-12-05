const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('../models/Student');

const clearTestUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // List all students
        const students = await Student.find({});
        console.log(`\n📋 Found ${students.length} students in database:`);
        students.forEach(s => {
            console.log(`  - ${s.email} (${s.name})`);
        });

        // Optionally clear all test users (commented out for safety)
        // const result = await Student.deleteMany({});
        // console.log(`\n🗑️  Deleted ${result.deletedCount} students`);

        await mongoose.connection.close();
        console.log('\n✅ Done!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

clearTestUsers();
