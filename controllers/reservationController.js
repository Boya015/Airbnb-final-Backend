const Reservation = require('../models/Reservation');

const createReservation = async (req, res) => {
  const { accommodation, startDate, endDate } = req.body;
  const reservation = new Reservation({
    accommodation,
    user: req.user._id,
    startDate,
    endDate,
  });

  const savedReservation = await reservation.save();
  res.status(201).json(savedReservation);
};

const getReservationsByHost = async (req, res) => {
  const reservations = await Reservation.find()
    .populate({
      path: 'accommodation',
      match: { host: req.user._id },
    })
    .populate('user', 'username');
  res.json(reservations);
};

const getReservationsByUser = async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id }).populate('accommodation');
  res.json(reservations);
};

module.exports = { createReservation, getReservationsByHost, getReservationsByUser };
