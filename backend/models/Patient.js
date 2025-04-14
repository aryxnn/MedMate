const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  medicalHistory: String,
  currentMedications: String,
  Temperature: String,
  HeartRate: String,
  allergies: String,
  symptoms: String,
  duration: String,
  severity: String,
  triggers: String,
  lifestyle: {
    travelHistory: String,
    smoking: String,
    alcohol: String,
    sleepQuality: String,
    diet: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", PatientSchema);
