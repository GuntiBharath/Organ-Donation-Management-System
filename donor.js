const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// Register a new donor
router.post('/', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: 'Donor registered successfully', donor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get donors with optional filters: organ, bloodType, location
router.get('/', async (req, res) => {
  try {
    const { organ, bloodType, location } = req.query;
    let filter = {};

    if (organ) {
      filter.organsWillingToDonate = organ;
    }
    if (bloodType) {
      filter.bloodType = bloodType;
    }
    if (location) {
      const regex = new RegExp(location, 'i');
      filter.$or = [
        { 'location.country': regex },
        { 'location.state': regex },
        { 'location.city': regex },
      ];
    }

    const donors = await Donor.find(filter);
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
