import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
     const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/auth/login', formData);
      console.log('Login response:', res.data); // Add this line to inspect response
  
      const { token, name } = res.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
  
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };
  
  
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <main className="form-signin text-center">
        <form onSubmit={handleSubmit}>
          <div className="d-flex align-items-center justify-content-center mb-4 gap-3">
            <img src="/envelope-paper.svg" alt="Logo" width="50" height="50" />
            <h1 className="h3 fw-normal m-0">Please sign in</h1>
          </div>

          <div className="form-floating">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mt-2">
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

          <button className="w-100 btn btn-lg btn-primary mt-4" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
