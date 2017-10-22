const mongoose = require('mongoose');

const placesBeenSchema = new mongoose.Schema({
  placeName: String,
  image: { type: String, required: true },
  whoWith: { type: String, required: true },
  whyThoughts: String
});

module.exports = mongoose.model('PlacesBeen', placesBeenSchema);
