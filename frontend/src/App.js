import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import PatientForm from './pages/PatientForm';
import DiagnosisResult from './pages/DiagnosisResult';
import Layout from './pages/Layout'; // Make sure you have this
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with persistent navbar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/form" element={<PatientForm />} />
          <Route path="/history" element={<DiagnosisResult />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
