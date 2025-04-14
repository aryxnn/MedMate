import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Loader.css'; // Make sure your loader CSS is in this file

const PatientForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    medicalHistory: '',
    currentMedications: '',
    Temperature: '',
    HeartRate: '',
    allergies: '',
    symptoms: '',
    duration: '',
    severity: '',
    triggers: '',
    lifestyle: {
      travelHistory: '',
      smoking: '',
      alcohol: '',
      sleepQuality: '',
      diet: ''
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.lifestyle) {
      setForm({ ...form, lifestyle: { ...form.lifestyle, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/diagnose', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/history');
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="container py-5">
  {loading && (
    <div className="loader-overlay d-flex justify-content-center align-items-center">
      <div className="text-center">
        <span className="loader"></span>
        <h5 className="text-black mt-3">Analyzing symptoms. Please wait...</h5>
      </div>
    </div>
  )}
      
      {!loading && (
        <>
          <h2 className="text-center mb-4">Patient Intake Form</h2>
          <form onSubmit={handleSubmit}>
            {/* Section 1: Personal Details */}
            <h5>Personal Details</h5>
            <div className="row mb-3">
              <div className="col">
                <input type="number" className="form-control" name="age" placeholder="Age" value={form.age} onChange={handleChange} />
              </div>
              <div className="col">
                <select className="form-control" name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col">
                <input type="number" className="form-control" name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} />
              </div>
              <div className="col">
                <input type="number" className="form-control" name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} />
              </div>
            </div>

            {/* Section 2: Medical Info */}
            <h5>Medical History</h5>
            <textarea className="form-control mb-3" name="medicalHistory" placeholder="Medical History" value={form.medicalHistory} onChange={handleChange}></textarea>

            <h5>Current Medications</h5>
            <textarea className="form-control mb-3" name="currentMedications" placeholder="Current Medications" value={form.currentMedications} onChange={handleChange}></textarea>

            {/* Section 3: Vitals */}
            <h5>Vitals</h5>
            <div className="row mb-3">
              <div className="col">
                <input type="text" className="form-control" name="Temperature" placeholder="Temperature (°C)" value={form.Temperature} onChange={handleChange} />
              </div>
              <div className="col">
                <input type="text" className="form-control" name="HeartRate" placeholder="Heart Rate (bpm)" value={form.HeartRate} onChange={handleChange} />
              </div>
            </div>

            {/* Section 4: Allergies & Symptoms */}
            <h5>Allergies & Symptoms</h5>
            <input type="text" className="form-control mb-3" name="allergies" placeholder="Allergies" value={form.allergies} onChange={handleChange} />
            <textarea className="form-control mb-3" name="symptoms" placeholder="Symptoms" value={form.symptoms} onChange={handleChange}></textarea>

            {/* Section 5: Duration, Severity, Triggers */}
            <h5>Symptoms Details</h5>
            <input type="text" className="form-control mb-2" name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} />
            <input type="text" className="form-control mb-2" name="severity" placeholder="Severity" value={form.severity} onChange={handleChange} />
            <input type="text" className="form-control mb-3" name="triggers" placeholder="Triggers" value={form.triggers} onChange={handleChange} />

            {/* Section 6: Lifestyle */}
            <h5>Lifestyle Information</h5>
            <input type="text" className="form-control mb-2" name="travelHistory" placeholder="Travel History" value={form.lifestyle.travelHistory} onChange={handleChange} />
            <input type="text" className="form-control mb-2" name="smoking" placeholder="Smoking (Yes/No)" value={form.lifestyle.smoking} onChange={handleChange} />
            <input type="text" className="form-control mb-2" name="alcohol" placeholder="Alcohol (Yes/No)" value={form.lifestyle.alcohol} onChange={handleChange} />
            <input type="text" className="form-control mb-2" name="sleepQuality" placeholder="Sleep Quality" value={form.lifestyle.sleepQuality} onChange={handleChange} />
            <input type="text" className="form-control mb-4" name="diet" placeholder="Diet" value={form.lifestyle.diet} onChange={handleChange} />

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default PatientForm;
