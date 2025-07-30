const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
