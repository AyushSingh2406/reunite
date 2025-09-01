import React, { useState } from 'react';
import authService from '../../services/authService';

const ResetPasswordForm = ({ email, handleClose }) => {
    const [formData, setFormData] = useState({
        token: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { token, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await authService.resetPassword({ email, token, password });
            setMessage(res.data.msg);
            setTimeout(() => {
                handleClose(); // Close the modal on success
            }, 2000); // Wait 2 seconds to show the success message
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        }
    };

    return (
        <div className="auth-container">
            <h3 className="auth-title">Reset Your Password</h3>
            {message && <p style={{color: 'green'}}>{message}</p>}
            {error && <p className="auth-error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <p>Enter the OTP from your email and your new password.</p>
                <div className="input-wrapper">
                    <input type="text" placeholder="OTP" className="auth-input" name="token" value={token} onChange={onChange} required />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="New Password" className="auth-input" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit" className="auth-submit-btn">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;

