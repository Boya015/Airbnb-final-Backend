const Accommodation = require('../models/Accommodation');

const createAccommodation = async (req, res) => {
  const { name, location, price, description } = req.body;
  const accommodation = new Accommodation({
    name,
    location,
    price,
    description,
    host: req.user._id,
  });

  const savedAccommodation = await accommodation.save();
  res.status(201).json(savedAccommodation);
};

const getAccommodations = async (req, res) => {
  const accommodations = await Accommodation.find().populate('host', 'username');
  res.json(accommodations);
};

const deleteAccommodation = async (req, res) => {
  const accommodation = await Accommodation.findById(req.params.id);
  if (accommodation && accommodation.host.toString() === req.user._id.toString()) {
    await accommodation.remove();
    res.json({ message: 'Accommodation removed' });
  } else {
    res.status(401).json({ message: 'Not authorized to delete this accommodation' });
  }
};

module.exports = { createAccommodation, getAccommodations, deleteAccommodation };
