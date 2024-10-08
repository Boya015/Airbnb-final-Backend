const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  bookedBy: { type: String, required: true },
  property: { type: String, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
