const mongoose = require('mongoose');

const damageReportSchema = new mongoose.Schema({
    seatId: {
        type: String,
        required: true
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String
    },
    reportedBy: {
        type: String, // Can be student ID or 'admin'
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'investigating', 'resolved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DamageReport', damageReportSchema);
