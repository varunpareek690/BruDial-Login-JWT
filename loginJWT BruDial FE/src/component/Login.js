import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // Import the CSS file
import image from './Login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/signin', { email, password });
      const token = response.data.token;
      console.log('JWT Token:', token); // Log the token to the console
      localStorage.setItem('token', token); // Save JWT token
      console.log('Token stored in localStorage:', localStorage.getItem('token')); // Verify token storage
      navigate('/home'); // Redirect to a protected route
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  return (
    <div className="login-page">
      <div className="circle top-right"></div>
      <div className="circle bottom-right"></div>
      <div className="login-container">
        <div className="login-left">
          <div className="logo">
            <div className="square"></div>
            <h3>BruDial</h3>
          </div>
          <div className='welcome-text'>
          <h2>Welcome Back :)</h2>
          </div>
          <div className='welcome-para'>
          <p>
            To keep connected with us please login with your personal
            information by email address and password
          </p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <button className="reset-password">Reset Password !!</button>
        </div>
        <div className="login-right">
          <img src={image} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;

