const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const { createTicket, verifyToken, markUsedAtomic, getTicket } = require('../services/ticketService');
const ValidationLog = require('../models/ValidationLog');

// Rate limit validation endpoint
const validateLimiter = rateLimit({ windowMs: 60 * 1000, max: 10 });

// POST /api/tickets/create
router.post('/create', authenticate, async (req, res) => {
  try {
    const { eventId, userId, metadata } = req.body;
    if (!eventId || !userId) {
      return res.status(400).json({ code: 'bad-request', message: 'eventId and userId are required' });
    }

    const result = await createTicket({ eventId, userId, metadata });
    res.status(201).json({ ticketId: result.ticketId, qrDataUri: result.qrDataUri, token: result.token, validationUrl: result.validationUrl });
  } catch (error) {
    console.error('Ticket create error:', error);
    res.status(500).json({ code: 'server-error', message: 'Failed to create ticket' });
  }
});

// POST /api/tickets/validate
router.post('/validate', validateLimiter, async (req, res) => {
  try {
    const token = req.body.token || req.query.token;
    const scannerId = req.body.scannerId || req.query.scannerId;
    const ip = req.ip;

    if (!token) {
      return res.status(400).json({ code: 'bad-request', message: 'token is required' });
    }

    const verified = verifyToken(token);
    if (!verified.valid) {
      await ValidationLog.create({ ticketId: null, ip, scannerId, result: 'fail', reason: verified.reason });
      return res.status(401).json({ code: verified.reason, message: verified.reason === 'expired' ? 'Token expired' : 'Invalid token' });
    }

    const { tid, eid, uid } = verified.payload;
    const found = await getTicket(tid);
    if (!found) {
      await ValidationLog.create({ ticketId: tid, ip, scannerId, result: 'fail', reason: 'not-found' });
      return res.status(404).json({ code: 'not-found', message: 'Ticket not found' });
    }

    if (found.status === 'used') {
      await ValidationLog.create({ ticketId: tid, ip, scannerId, result: 'fail', reason: 'already-used' });
      return res.status(409).json({ code: 'already-used', message: 'Ticket already used' });
    }

    const updated = await markUsedAtomic(tid);
    if (!updated) {
      // could be race: treat as already used
      await ValidationLog.create({ ticketId: tid, ip, scannerId, result: 'fail', reason: 'already-used' });
      return res.status(409).json({ code: 'already-used', message: 'Ticket already used' });
    }

    await ValidationLog.create({ ticketId: tid, ip, scannerId, result: 'ok', reason: 'validated' });
    res.json({ result: 'ok', ticketId: tid, eventId: eid, userId: uid });
  } catch (error) {
    console.error('Ticket validate error:', error);
    res.status(500).json({ code: 'server-error', message: 'Validation failed' });
  }
});

// GET /api/tickets/:ticketId (admin)
router.get('/:ticketId', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await getTicket(ticketId);
    if (!ticket) return res.status(404).json({ code: 'not-found', message: 'Ticket not found' });

    const logs = await ValidationLog.find({ ticketId }).sort({ timestamp: -1 }).limit(20);
    res.json({ ticket, logs });
  } catch (error) {
    console.error('Ticket admin get error:', error);
    res.status(500).json({ code: 'server-error', message: 'Failed to fetch ticket' });
  }
});

module.exports = router;

