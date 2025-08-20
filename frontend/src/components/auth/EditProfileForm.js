// 



import React, { useState } from 'react';
import authService from '../../services/authService';

const EditProfileForm = ({ user, onUpdateSuccess, handleClose }) => {
    const [formData, setFormData] = useState({
        username: user.username || '',
        email: user.email || '',
        collegeId: user.collegeId || '',
        address: user.address || '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { username, email, collegeId, address } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            const response = await authService.updateProfile(formData);
            onUpdateSuccess(response.user);
            alert(response.msg);
            handleClose();
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to update profile.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            <h3 className="auth-title">Edit Profile</h3>
            {error && <p className="auth-error">{error}</p>}
            
            <div className="input-wrapper">
                <input type="text" placeholder="Username" className="auth-input" name="username" value={username} onChange={onChange} required />
            </div>
            <div className="input-wrapper">
                <input type="email" placeholder="Email" className="auth-input" name="email" value={email} onChange={onChange} required />
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="College ID" className="auth-input" name="collegeId" value={collegeId} onChange={onChange} />
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Address" className="auth-input" name="address" value={address} onChange={onChange} />
            </div>
            
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
        </form>
    );
};

export default EditProfileForm;
