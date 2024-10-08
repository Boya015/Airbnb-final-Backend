const express = require('express');
const { createReservation, getReservationsByHost, getReservationsByUser } = require('../controllers/reservationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createReservation);
router.get('/host', auth, getReservationsByHost);
router.get('/user', auth, getReservationsByUser);

module.exports = router;
