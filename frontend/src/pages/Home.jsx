import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">🧬 MedMate</h3>
        </div>
      </header>

      <main className="px-3 text-center">
        <h1 className="display-4 fw-bold">Welcome to Our Medical Diagnosis App</h1>
        <p className="lead">Get accurate medical diagnoses using symptoms and history input. Start by logging in or registering.</p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary btn-lg">
            Register
          </Link>
        </div>
      </main>

      <footer className="mt-auto text-white-50">
        <p>Medical Diagnosis App &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Home;
