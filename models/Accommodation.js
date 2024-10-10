const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    rating: { type: Number, default: 0 }, // Optional, default 0 when no rating
    reviews: { type: Number, default: 0 }, // Optional, default 0 when no reviews
    price: { type: Number, required: true },
    image: { type: String, required: true },
    amenities: { type: [String], required: true },
    location: { type: String, required: true }, // Add location field
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
});

const accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = accommodation;
