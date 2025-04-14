import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
     const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData);
  
      // Assuming backend returns token and user like this:
      const { token, name } = res.data;
  
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
  
      alert('Registration successful!');
      navigate('/login');
      // Redirect to home or login
      // navigate('/home'); // if using useNavigate
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <main className="form-signin text-center">
        <form onSubmit={handleSubmit}>
          <div className="d-flex align-items-center justify-content-center mb-4 gap-3">
            <img src="/envelope-paper.svg" alt="Logo" width="50" height="50" />
            <h1 className="h3 fw-normal m-0">Please Register</h1>
          </div>

          <div className="form-floating mb-2">
            <input
              type="text"
              name="name"
              className="form-control"
              id="floatingName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingName">Full Name</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
