const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  name: String,
  image: { type: String, required: true },
  whoWith: { type: String, required: true },
  whyThoughts: { type: String, trim: true },
  status: { type: String, trim: true, enum: ['Been', 'To Go'], default: 'Been' }
});

module.exports = mongoose.model('Place', placesSchema);
