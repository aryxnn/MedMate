// controllers/diagnosisController.js

const axios = require("axios");
const Diagnosis = require("../models/Diagnosis");

const diagnose = async (req, res) => {
  try {
    const { symptoms, age, gender, weight, medicalHistory, medications, temperature, heartRate, allergies, duration, severity, lifestyle, context } = req.body;

    const prompt = `
    You are a professional medical assistant. Based on the patient data below, reply ONLY in valid JSON with:

    {
      "diagnosis": [
        { "condition": "Condition Name", "reason": "Explanation" },
        { "condition": "Condition Name", "reason": "Explanation" },
        { "condition": "Condition Name", "reason": "Explanation" }
      ],
      "medicines": [
        { "compound": "Medicine Name", "for": "Symptom it helps with" }
      ],
      "urgentAttention": "Yes/No with reason"
    }

    Do NOT include markdown, explanations, or anything outside of this JSON format.

    A patient reports the following:
    - Age: ${age}
    - Gender: ${gender}
    - Weight: ${weight}
    - Medical History: ${medicalHistory}
    - Current Medications: ${medications}
    - Temperature: ${temperature}
    - Heart Rate: ${heartRate}
    - Allergies: ${allergies}
    - Symptoms: ${symptoms}
    - Duration: ${duration}
    - Severity: ${severity}
    - Lifestyle Info: ${lifestyle}
    - Additional Context: ${context}

    Based on this information, what are the possible diseases and suggested medications (if any)? Provide detailed reasoning like a doctor.
    `;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );

    let content = response.data.choices[0].message.content;
    content = content.replace(/^```json|```$/g, "").trim();
    
    const diagnosis = JSON.parse(content);

    // Save the diagnosis along with patient data to the database
    const newDiagnosis = new Diagnosis({
      user: req.user.id, // Assuming user ID is in the req.user object after auth
      patientData: {
        age,
        gender,
        weight,
        medicalHistory,
        medications,
        temperature,
        heartRate,
        allergies,
        symptoms,
        duration,
        severity,
        lifestyle,
        context
      },
      diagnosis: diagnosis.diagnosis,
      medicines: diagnosis.medicines,
      urgentAttention: diagnosis.urgentAttention
    });

    await newDiagnosis.save(); // Save diagnosis to the DB

    res.json(diagnosis); // Return the diagnosis response

  } catch (error) {
    console.error("Diagnosis error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch diagnosis." });
  }
};

// This function retrieves the diagnosis history along with patient inputs for a user
const getHistory = async (req, res) => {
  try {
    const history = await Diagnosis.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ history }); // Return the history, including both patient data and diagnosis
  } catch (error) {
    console.error("History error:", error.message);
    res.status(500).json({ error: "Failed to fetch diagnosis history." });
  }
};

module.exports = { diagnose, getHistory };
