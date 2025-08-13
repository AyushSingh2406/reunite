// import React, { useState } from 'react';

// // --- Auth Form Component with Fetch ---
// const AuthForm = ({ onAuthSuccess, handleClose }) => {
//     const [mode, setMode] = useState('login'); // 'login', 'signup', 'admin'
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState('');
    
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [username, setUsername] = useState('');

//     // CORRECTED: The URL now includes '/auth' to match the backend routes
//     const API_URL = 'http://localhost:5000/api/auth';

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setError('');

//         const isSignup = mode === 'signup';
//         // The endpoint is now just '/signup' or '/login' since the base path is in API_URL
//         const endpoint = isSignup ? `${API_URL}/signup` : `${API_URL}/login`;
//         const payload = isSignup ? { username, email, password } : { email, password };

//         try {
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 // The backend controller sends a 'msg' property in the error response.
//                 throw new Error(data.msg || 'An unknown error occurred.');
//             }

//             if (isSignup) {
//                 // As per authController.js, signup returns a success message.
//                 // We then switch the user to the login form to sign in.
//                 setMode('login');
//                 setError('Signup successful! Please sign in.');
//             } else { // Login mode (for both user and admin)
//                 // As per authController.js, login returns a token and a user object.
//                 localStorage.setItem('token', data.token);
                
//                 // The user object from the backend is passed to onAuthSuccess.
//                 const user = data.user || { email, role: 'user' }; // Fallback if user object isn't returned
//                 onAuthSuccess(user);
//                 handleClose();
//             }
//         } catch (err) {
//             // This will now catch JSON parsing errors if the URL is still wrong
//             if (err instanceof SyntaxError) {
//                 setError("Received an invalid response from the server. Please check the API URL.");
//             } else {
//                 setError(err.message);
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleGoogleSignIn = () => {
//         setError('Google Sign-In is not implemented in this example.');
//     };

//     const getTitle = () => {
//         if (mode === 'signup') return 'Create Account';
//         if (mode === 'admin') return 'Admin Sign In';
//         return 'Sign In';
//     };

//     return (
//         <div className="auth-container">
//             <h3 className="auth-title">{getTitle()}</h3>
            
//             {mode !== 'signup' && (
//                 <div className="auth-mode-slider">
//                     <button onClick={() => setMode('login')} className={`mode-btn ${mode === 'login' ? 'active' : ''}`}>User</button>
//                     <button onClick={() => setMode('admin')} className={`mode-btn ${mode === 'admin' ? 'active' : ''}`}>Admin</button>
//                     <div className={`glider ${mode === 'admin' ? 'admin' : 'user'}`}></div>
//                 </div>
//             )}

//             <div className="auth-content">
//                 {mode === 'login' && (
//                     <>
//                         <button className="google-btn" onClick={handleGoogleSignIn}>
//                             <svg className="google-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
//                             <span>Sign in with Google</span>
//                         </button>
//                         <div className="divider"><span>or</span></div>
//                     </>
//                 )}
//                 {error && <p className="auth-error">{error}</p>}
//                 <form className="auth-form" onSubmit={handleSubmit}>
//                     <div className={`username-container ${mode === 'signup' ? 'show' : ''}`}>
//                         <div className="input-wrapper">
//                             <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
//                             <input type="text" placeholder="Username" className="auth-input" value={username} onChange={(e) => setUsername(e.target.value)} required={mode === 'signup'} />
//                         </div>
//                     </div>
//                     <div className="input-wrapper">
//                         <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
//                         <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div className="input-wrapper">
//                         <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
//                                 <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <button type="submit" className={`auth-submit-btn ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
//                         <span className="btn-text">{isSubmitting ? '' : (mode === 'login' ? 'Sign In' : (mode === 'signup' ? 'Create Account' : 'Admin Sign In'))}</span>
//                         <div className="spinner"></div>
//                     </button>
//                 </form>
                
//                 <div className="auth-toggle-container">
//                     {mode === 'login' && (
//                         <p className="auth-toggle">
//                             Don't have an account?
//                             <button onClick={() => { setMode('signup'); setError(''); }} className="toggle-btn">Sign Up</button>
//                         </p>
//                     )}
//                     {mode === 'signup' && (
//                         <p className="auth-toggle">
//                             Already have an account?
//                             <button onClick={() => { setMode('login'); setError(''); }} className="toggle-btn">Sign In</button>
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthForm;

// src/components/auth/AuthForm.js

import React, { useState } from 'react';
import authService from '../../services/authService';

const AuthForm = ({ onAuthSuccess, handleClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                // For Login
                const data = await authService.login(email, password);
                onAuthSuccess(data); // Pass the entire data object to App.js
            } else {
                // For Signup
                await authService.signup({ username, email, password });
                alert('Signup successful! Please log in.');
                setIsLogin(true); // Switch to the login view
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="auth-subtitle">{isLogin ? 'Please sign in to continue' : 'Join our community'}</p>
            
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <p className="auth-error">{error}</p>}
                
                {!isLogin && (
                    <div className="input-wrapper">
                        <input type="text" placeholder="Username" className="auth-input" name="username" value={username} onChange={onChange} required />
                    </div>
                )}
                <div className="input-wrapper">
                    <input type="email" placeholder="Email" className="auth-input" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Password" className="auth-input" name="password" value={password} onChange={onChange} required />
                </div>
                
                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                    {isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </button>
            </form>

            <p className="auth-toggle">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
