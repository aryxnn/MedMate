import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiagnosisResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnosisHistory = async () => {
      try {
        const token = localStorage.getItem('token');  // Make sure token is set in localStorage
        if (!token) {
          alert('Please login to view your diagnosis history.');
          return;
        }

        // API call to fetch the diagnosis history
        const res = await axios.get('${process.env.REACT_APP_BACKEND_URL}/api/diagnose/history', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.history && res.data.history.length > 0) {
          setResult(res.data.history);
        } else {
          alert('No diagnosis history found.');
        }
      } catch (err) {
        console.error('Error fetching diagnosis history:', err);
        alert('Failed to load diagnosis history.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosisHistory();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!result || result.length === 0) return <div className="text-center mt-5">No diagnosis history found.</div>;

  return (
    <div className="container my-5">
      {/* Disclaimer */}
      <div className="alert alert-warning text-center fw-bold">
        ⚠️ <u>Disclaimer:</u> The medical information and medicines shown here are for <strong>testing and educational purposes only</strong>. Do not take any medication without consulting a licensed healthcare professional. Always seek advice from a doctor for any health-related issues.
      </div>

      <h2 className="mb-4 text-center">🧠 Your Diagnosis History</h2>

      {result.map((item, index) => (
        <div key={index} className="mb-5">
          <h4>📋 Diagnosed Conditions</h4>
          <ul className="list-group">
            {item.diagnosis.map((d, i) => (
              <li key={i} className="list-group-item">
                <strong>{d.condition}</strong>: {d.reason}
              </li>
            ))}
          </ul>

          {item.urgentAttention && (
            <div className="alert alert-danger fw-bold mt-4">
              ⚠️ Urgent Attention Required: {item.urgentAttention}
            </div>
          )}

          <section className="mt-4">
            <h4>💊 Prescribed Medicines</h4>
            <ul className="list-group">
              {item.medicines.map((m, i) => (
                <li key={i} className="list-group-item">
                  <strong>{m.compound}</strong> - for {m.for}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-4">
            <h4>🧾 Patient's Input Data</h4>
            <ul className="list-group">
              <li className="list-group-item"><strong>Age:</strong> {item.patientData.age}</li>
              <li className="list-group-item"><strong>Gender:</strong> {item.patientData.gender}</li>
              <li className="list-group-item"><strong>Weight:</strong> {item.patientData.weight}</li>
              <li className="list-group-item"><strong>Medical History:</strong> {item.patientData.medicalHistory}</li>
              <li className="list-group-item"><strong>Medications:</strong> {item.patientData.medications}</li>
              <li className="list-group-item"><strong>Allergies:</strong> {item.patientData.allergies}</li>
              <li className="list-group-item"><strong>Symptoms:</strong> {item.patientData.symptoms}</li>
              <li className="list-group-item"><strong>Duration of Symptoms:</strong> {item.patientData.duration}</li>
              <li className="list-group-item"><strong>Severity:</strong> {item.patientData.severity}</li>
            </ul>
          </section>
        </div>
      ))}
    </div>
  );
};

export default DiagnosisResult;
