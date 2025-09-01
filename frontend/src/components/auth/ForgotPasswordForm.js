import React, { useState } from 'react';
import authService from '../../services/authService';

const ForgotPasswordForm = ({ onOtpSent }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await authService.forgotPassword(email);
            setMessage(res.data.msg);
            onOtpSent(email); // Tell the parent component to switch to the reset form
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        }
    };

    return (
        <div className="auth-container">
            <h3 className="auth-title">Forgot Password</h3>
            {message && <p style={{color: 'green'}}>{message}</p>}
            {error && <p className="auth-error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <p>Enter your email to receive a password reset OTP.</p>
                <div className="input-wrapper">
                    <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="auth-submit-btn">Send OTP</button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
