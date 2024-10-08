import React, { useState } from "react";
import apiClient from "../api";
import './css/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/api/auth/sendOTP', { email });
            setStep(2); // Move to OTP verification step
        } catch (error) {
            setError('Failed to send OTP');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/api/auth/verifyOTP', { email, otp });
            setStep(3); // Move to password reset step
        } catch (error) {
            setError('Invalid OTP');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await apiClient.post('/api/auth/changePassword', { email, newPassword });
            alert("Password changed successfully!");
        } catch (error) {
            setError('Failed to change password');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-logo">
                    <img src="/logo.png" alt="logo" />
                </div>
                <h2>Forgot Password</h2>
                {error && <p className="error-message">{error}</p>}

                {step === 1 && (
                    <form onSubmit={handleSendOTP}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="register-button">Send OTP</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP}>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="register-button">Verify OTP</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleChangePassword}>
                        <div className="input-container">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="register-button">Change Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
