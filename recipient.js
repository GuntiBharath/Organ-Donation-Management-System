const express = require('express');
const router = express.Router();
const Recipient = require('../models/Recipient');

// Register a new recipient
router.post('/', async (req, res) => {
  try {
    const recipient = new Recipient(req.body);
    await recipient.save();
    res.status(201).json({ message: 'Recipient registered successfully', recipient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get recipients (optional: add filters if needed)
router.get('/', async (req, res) => {
  try {
    const recipients = await Recipient.find();
    res.json(recipients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
