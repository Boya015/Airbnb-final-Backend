const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');

// CREATE: Add a new accommodation
router.post('/accommodations', async (req, res) => {
  console.log('Incoming Accommodation Data:', req.body);
  const accommodation = new Accommodation(req.body);
  try {
    const savedAccommodation = await accommodation.save();
    res.status(201).json(savedAccommodation);
  } catch (error) {
    console.error('Error saving accommodation:', error);
    res.status(400).json({ error: error.message });
  }
});

// Other accommodation routes (GET, PUT, DELETE) can be added here

module.exports = router;
