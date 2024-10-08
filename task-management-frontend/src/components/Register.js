import React, { useState } from 'react';
import apiClient from '../api';
import './css/Register.css'; // Import CSS file for styling

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/auth/register', { username, password, email });
      console.log('User registered:', response.data);
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="input-container">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="input-container">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <a href="/login" className="forgot-password">Login now!</a>
      </div>
    </div>

    
  );
  
};

export default Register;
