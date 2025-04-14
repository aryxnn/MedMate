 // models/Diagnosis.js

const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    patientData: {
      age: Number,
      gender: String,
      weight: Number,
      medicalHistory: String,
      medications: String,
      temperature: Number,
      heartRate: Number,
      allergies: String,
      symptoms: String,
      duration: String,
      severity: String,
      lifestyle: { type: Object }, // Change this to Object type
      context: String
    },
    diagnosis: [
      {
        condition: String,
        reason: String
      }
    ],
    medicines: [
      {
        compound: String,
        for: String
      }
    ],
    urgentAttention: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
