const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  address: {
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true }
  },
  image: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  stars: { type: Number, required: true },
  comments: [commentSchema]
});

hotelSchema.methods.belongsTo = function hotelBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Hotel', hotelSchema);
