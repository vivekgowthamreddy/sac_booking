const mongoose = require('mongoose');

const validationLogSchema = new mongoose.Schema({
  ticketId: { type: String, index: true },
  ip: { type: String },
  scannerId: { type: String },
  result: { type: String },
  reason: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ValidationLog', validationLogSchema);

