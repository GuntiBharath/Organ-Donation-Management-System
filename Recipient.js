const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  bloodType: { type: String, required: true },
  organNeeded: { type: String, required: true },
  urgencyLevel: { type: String, required: true },
  medicalRecordId: { type: String, required: true },
  hospital: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
  },
  consent: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Recipient', recipientSchema);
