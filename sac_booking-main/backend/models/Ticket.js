const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true, index: true },
  eventId: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, enum: ['issued', 'used', 'cancelled'], default: 'issued' },
  issuedAt: { type: Date, default: Date.now },
  usedAt: { type: Date, default: null },
  metadata: { type: Object, default: {} },
});

module.exports = mongoose.model('Ticket', ticketSchema);

