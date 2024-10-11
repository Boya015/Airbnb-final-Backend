const express = require('express');
const Accommodation = require('../models/Accommodation');
const router = express.Router();

// CREATE: Add a new accommodation
router.post('/', async (req, res) => {
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
// GET all accommodations
router.get('/', async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});
// Other accommodation routes (GET, PUT, DELETE) can be added here

module.exports = router;
