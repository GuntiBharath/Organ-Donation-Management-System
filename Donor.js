const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  bloodType: { type: String, required: true },
  organsWillingToDonate: [{ type: String }],
  existingMedicalConditions: { type: String },
  consent: { type: Boolean, required: true },
  location: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
