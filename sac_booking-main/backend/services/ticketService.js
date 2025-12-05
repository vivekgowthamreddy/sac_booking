const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const crypto = require('crypto');
const Ticket = require('../models/Ticket');

const QR_JWT_SECRET = process.env.QR_JWT_SECRET || process.env.JWT_SECRET;
const API_HOST = process.env.API_HOST || 'http://localhost:5000';

const randomId = (prefix = 'TICK') => `${prefix}_${crypto.randomBytes(3).toString('hex')}`;

const createTicket = async ({ eventId, userId, metadata = {} }) => {
  const ticketId = randomId('TICK');
  const issuedAt = Date.now();
  const exp = issuedAt + 30 * 24 * 60 * 60 * 1000; // 30 days

  const payload = { tid: ticketId, eid: eventId, uid: userId, iat: Math.floor(issuedAt / 1000), exp: Math.floor(exp / 1000) };
  const token = jwt.sign(payload, QR_JWT_SECRET, { algorithm: 'HS256' });

  const doc = await Ticket.create({ ticketId, eventId, userId, status: 'issued', issuedAt: new Date(issuedAt), metadata });

  const validationUrl = `${API_HOST}/api/tickets/validate?token=${encodeURIComponent(token)}`;
  const qrDataUri = await QRCode.toDataURL(validationUrl, { errorCorrectionLevel: 'M', scale: 4 });

  return { ticketId, token, qrDataUri, validationUrl, document: doc };
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, QR_JWT_SECRET, { algorithms: ['HS256'] });
    return { valid: true, payload };
  } catch (err) {
    const reason = err.name === 'TokenExpiredError' ? 'expired' : 'invalid';
    return { valid: false, reason };
  }
};

const markUsedAtomic = async (ticketId) => {
  const now = new Date();
  const updated = await Ticket.findOneAndUpdate(
    { ticketId, status: 'issued' },
    { $set: { status: 'used', usedAt: now } },
    { new: true }
  );
  return updated;
};

const getTicket = async (ticketId) => Ticket.findOne({ ticketId });

const cancelTicketByBookingId = async (bookingId) => {
  const t = await Ticket.findOne({ 'metadata.bookingId': bookingId });
  if (!t) return null;
  t.status = 'cancelled';
  await t.save();
  return t;
};

module.exports = { createTicket, verifyToken, markUsedAtomic, getTicket, cancelTicketByBookingId };
