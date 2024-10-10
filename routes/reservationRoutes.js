const express = require('express');
const Reservation = require('../models/Reservation'); // Ensure the path is correct
const router = express.Router();

// GET all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new reservation
router.post('/', async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
