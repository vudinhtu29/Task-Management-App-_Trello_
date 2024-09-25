import React, { useState } from 'react';
import apiClient from '../api'; // Import Axios client
import './Login.css'; // Import CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      console.log(response.data);  // You can save the JWT token here
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  const h2Style = {
    fontFamily: "'Poppins', sans-serif", 
    fontSize: '2rem',
    color: '#007bff',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          {/* Add an image here or a font icon */}
          <img src="/logo.png" alt="logo" />
        </div>
        <h2 style={h2Style}>Trello Radley</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div><a href="/forgot-password" className="forgot-password">Forgot Password?</a></div>
        <div><a href="/register" className="forgot-password">You don't have account? Register Now!</a></div>
        
      </div>
    </div>
  );
};

export default Login;
