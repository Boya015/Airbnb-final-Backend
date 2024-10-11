const Accommodation = require('../models/Accommodation');

// Create accommodation
const createAccommodation = async (req, res) => {
  try {
    const { name, price, reviews, ratings, description, details, image } = req.body;
    const accommodation = new Accommodation({
      name,
      image,
      description,
      details,
      ratings,
      reviews,
      price
    });

    const savedAccommodation = await accommodation.save();
    res.status(201).json(savedAccommodation);
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to create accommodation', error });
  }
};

// Get all accommodations
const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find().populate('host', 'username');
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to fetch accommodations', error });
  }
};

// Delete accommodation
const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    if (accommodation.host.toString() === req.user._id.toString()) {
      await accommodation.remove();
      res.json({ message: 'Accommodation removed' });
    } else {
      res.status(403).json({ message: 'Not authorized to delete this accommodation' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to delete accommodation', error });
  }
};

module.exports = { createAccommodation, getAccommodations, deleteAccommodation };
