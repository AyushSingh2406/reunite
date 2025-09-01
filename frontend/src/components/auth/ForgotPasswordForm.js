import React, { useState } from 'react';
import authService from '../../services/authService';

const ForgotPasswordForm = ({ handleClose, handleShowModal }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            await authService.forgotPassword({ email });
            setMessage('OTP sent successfully! Please check your email.');
            // After success, switch to the Reset Password form
            handleShowModal('resetPassword', { email });
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to send OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h3 className="auth-title">Forgot Password</h3>
            <p className="auth-subtitle">Enter your email to receive a password reset OTP.</p>
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <p className="auth-error">{error}</p>}
                {message && <p className="auth-success">{message}</p>}
                
                <div className="input-wrapper">
                    <input 
                        type="email" 
                        placeholder="Your registered email" 
                        className="auth-input" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                
                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;

