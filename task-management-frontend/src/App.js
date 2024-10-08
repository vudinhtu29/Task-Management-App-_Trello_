import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import HomePage from './components/HomePage';

// Function to check if the user is authenticated (checks token in localStorage)
const isAuthenticated = () => {
  return localStorage.getItem('authToken'); // Assuming token is stored in localStorage after login
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path ("/") to login or home-page based on authentication */}
        <Route path="/" element={isAuthenticated() ? <Navigate to="/home-page" /> : <Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/home-page" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected route */}
        <Route path="/home-page" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
