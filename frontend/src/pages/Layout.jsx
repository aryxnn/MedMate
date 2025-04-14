// src/components/Layout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-light bg-white shadow-sm px-4">
        <span className="navbar-brand mb-0 h1">🧬 MedMate</span>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </nav>
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
