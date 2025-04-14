import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const medicalTips = [
  "Drink at least 8 glasses of water daily. 💧",
  "Wash your hands regularly to prevent infections. 🧼",
  "Get at least 7-8 hours of sleep every night. 🛌",
  "Eat more fruits and vegetables. 🍎🥦",
  "Take regular screen breaks to reduce eye strain. 👀",
];

const allConditions = [
    { title: "Fever", desc: "A temporary increase in body temperature, often due to an illness." },
    { title: "Cough", desc: "A reflex to clear your throat of mucus or irritants." },
    { title: "Headache", desc: "Pain in the head, often caused by stress or dehydration." },
    { title: "Cold", desc: "A viral infection affecting the nose and throat." },
    { title: "Back Pain", desc: "Discomfort in the back due to posture or strain." },
    { title: "Sore Throat", desc: "Pain or irritation in the throat, often due to infection." },
    { title: "Nausea", desc: "Feeling of sickness with an inclination to vomit." },
    { title: "Allergy", desc: "Body's immune response to a foreign substance." },
    { title: "Acne", desc: "A skin condition causing pimples due to clogged pores." },
    { title: "Indigestion", desc: "Discomfort in the stomach after eating." },
  ];
const HomePage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name') || "User";
  const [darkMode, setDarkMode] = useState(false);
  const [tip, setTip] = useState("");
  const [randomConditions, setRandomConditions] = useState([]);

  useEffect(() => {
    // Set a random tip
    const randomTip = medicalTips[Math.floor(Math.random() * medicalTips.length)];
    setTip(randomTip);

    // Pick 3 random unique conditions
    const shuffled = allConditions.sort(() => 0.5 - Math.random());
    setRandomConditions(shuffled.slice(0, 3));
  }, []);

  return (
    <div className={`min-vh-100 d-flex flex-column ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>

      {/* Main */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3">
        <main>
          <h1 className="display-4">Welcome, {name} 🩺</h1>
          <p className="lead">Your AI-powered medical assistant is here to help.</p>

          {/* Medical Tip */}
          <div className="alert alert-info mt-3" role="alert">
            🧠 <strong>Health Tip:</strong> {tip}
          </div>

          {/* Buttons */}
          <div className="mt-4">
            <button className="btn btn-primary me-3" onClick={() => navigate('/form')}>
              Fill Diagnosis Form
            </button>
            <button className="btn btn-outline-secondary" onClick={() => navigate('/history')}>
              View Diagnosis History
            </button>
          </div>

{/* Info Cards */}
<div className="row mt-5 justify-content-center gap-4">
  {randomConditions.map((cond, index) => (
    <div
      key={index}
      className={`col-md-3 col-sm-6 mb-4`}
      style={{ minWidth: "250px" }}
    >
      <div
        className={`card shadow-lg border-0 h-100 transition-all ${
          darkMode ? 'bg-gradient-dark text-light' : 'bg-white text-dark'
        }`}
        style={{
          borderRadius: "20px",
          background: darkMode
            ? "linear-gradient(135deg, #2c3e50, #4ca1af)"
            : "linear-gradient(135deg, #ffffff, #e0f7fa)",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div className="card-body text-center">
          <h5 className="card-title fw-bold mb-3">{cond.title}</h5>
          <p className="card-text">{cond.desc}</p>
        </div>
      </div>
    </div>
  ))}
</div>

        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 mt-auto">
        <p>Stay healthy with <strong>MedMate</strong>. Your data is safe and confidential. 👨‍⚕️</p>
      </footer>
    </div>
  );
};

export default HomePage;
