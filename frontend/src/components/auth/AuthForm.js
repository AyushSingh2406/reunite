// import React, { useState } from 'react';
// import authService from '../../services/authService';

// const AuthForm = ({ onAuthSuccess, handleClose }) => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const { username, email, password } = formData;

//     // This is the public URL of your deployed backend on Render
//     const backendUrl = 'https://reunite-vh55.onrender.com';

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');

//         try {
//             if (isLogin) {
//                 const data = await authService.login(email, password);
//                 onAuthSuccess(data);
//             } else {
//                 await authService.signup({ username, email, password });
//                 alert('Signup successful! Please log in.');
//                 setIsLogin(true);
//             }
//         } catch (err) {
//             setError(err.response?.data?.msg || 'An error occurred.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
//             <p className="auth-subtitle">{isLogin ? 'Please sign in to continue' : 'Join our community'}</p>
            
//             {/* --- NEW: Google Sign-In Button --- */}
//             {isLogin && (
//                 <>
//                     <a href={`${backendUrl}/api/auth/google`} className="google-btn">
//                         <svg className="google-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path></svg>
//                         <span>Sign in with Google</span>
//                     </a>
//                     <div className="divider"><span>or</span></div>
//                 </>
//             )}
            
//             <form onSubmit={handleSubmit} className="auth-form">
//                 {error && <p className="auth-error">{error}</p>}
                
//                 {!isLogin && (
//                     <div className="input-wrapper">
//                         <input type="text" placeholder="Username" className="auth-input" name="username" value={username} onChange={onChange} required />
//                     </div>
//                 )}
//                 <div className="input-wrapper">
//                     <input type="email" placeholder="Email" className="auth-input" name="email" value={email} onChange={onChange} required />
//                 </div>
//                 <div className="input-wrapper">
//                     <input type="password" placeholder="Password" className="auth-input" name="password" value={password} onChange={onChange} required />
//                 </div>
                
//                 <button type="submit" className="auth-submit-btn" disabled={isLoading}>
//                     {isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
//                 </button>
//             </form>

//             <p className="auth-toggle">
//                 {isLogin ? "Don't have an account? " : "Already have an account? "}
//                 <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
//                     {isLogin ? 'Sign Up' : 'Sign In'}
//                 </button>
//             </p>
//         </div>
//     );
// };

// export default AuthForm;



import React, { useState } from 'react';
import authService from '../../services/authService';

const AuthForm = ({ onAuthSuccess, handleClose, handleShowModal }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { username, email, password } = formData;

    // This is the public URL of your deployed backend on Render
    const backendUrl = 'https://reunite-vh55.onrender.com';

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                const data = await authService.login(email, password);
                onAuthSuccess(data);
            } else {
                await authService.signup({ username, email, password });
                alert('Signup successful! Please log in.');
                setIsLogin(true);
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
            
            {isLogin && (
                <>
                    <a href={`${backendUrl}/api/auth/google`} className="google-btn">
                        <svg className="google-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path></svg>
                        <span>Sign in with Google</span>
                    </a>
                    <div className="divider"><span>or</span></div>
                </>
            )}
            
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

            {/* --- NEW: Forgot Password Button --- */}
            {isLogin && (
                 <div className="auth-toggle">
                    <button onClick={() => handleShowModal('forgotPassword')} className="toggle-btn">
                        Forgot Password?
                    </button>
                </div>
            )}

            <div className="auth-toggle">
                <p>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;

