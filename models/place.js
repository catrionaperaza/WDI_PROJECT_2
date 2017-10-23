const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  name: String,
  image: { type: String, required: true },
  whoWith: { type: String, required: true },
  whyThoughts: { type: String, trim: true },
  status: { type: String, trim: true, enum: ['been', 'togo'], default: 'been' }
});

module.exports = mongoose.model('Place', placesSchema);
