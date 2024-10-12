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

router.delete('/', async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to delete hotel', error });
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
