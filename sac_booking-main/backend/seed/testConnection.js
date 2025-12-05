const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI;

const testConnection = async () => {
    try {
        console.log('🔌 Connecting to:', MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected successfully');

        // Try to list collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📚 Collections:', collections.map(c => c.name));

        // Try to insert a dummy document
        const TestSchema = new mongoose.Schema({ name: String });
        const TestModel = mongoose.model('Test', TestSchema);

        console.log('📝 Attempting write operation...');
        const doc = await TestModel.create({ name: 'test' });
        console.log('✅ Write successful:', doc);

        // Try to delete it
        await TestModel.deleteOne({ _id: doc._id });
        console.log('✅ Delete successful');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

testConnection();
