import React, { useState } from 'react';
import apiClient from '../api'; // Import Axios client
import './css/Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/auth/login', { username, password });
      console.log(response.data); 
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
        <div className="social-login-container">
          <p>Or login with:</p>
          <div className="social-buttons">
            <button className="social-button google-button">
              <img src="/gg.png" alt="Google" className="social-logo" /> Google
            </button>
            <button className="social-button facebook-button">
              <img src="/fb.png" alt="Facebook" className="social-logo" /> Facebook
            </button>
            <button className="social-button twitter-button">
              <img src="/tw.png" alt="Twitter" className="social-logo" /> Twitter
            </button>
          </div>
        </div>
        <div><a href="/forgot-password" className="forgot-password">Forgot Password?</a></div>
        <div><a href="/register" className="forgot-password">You don't have an account? Register Now!</a></div>
        
      </div>
    </div>
  );
};

export default Login;
