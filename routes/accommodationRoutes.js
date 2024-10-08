const express = require('express');
const { createAccommodation, getAccommodations, deleteAccommodation } = require('../controllers/accommodationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createAccommodation);
router.get('/', getAccommodations);
router.delete('/:id', auth, deleteAccommodation);

module.exports = router;
