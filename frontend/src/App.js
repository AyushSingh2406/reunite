// import React, { useState, useEffect } from 'react';
// import './App.css';
// import itemService from './services/itemService';
// import authService from './services/authService';

// // Import components
// import Header from './components/common/Header';
// import Modal from './components/common/Modal';
// import HomePage from './components/home/HomePage';
// import UserDashboard from './components/dashboard/UserDashboard';
// import AdminDashboard from './components/dashboard/AdminDashboard';
// import AuthForm from './components/auth/AuthForm';
// import LostItemForm from './components/dashboard/LostItemForm';
// import FoundItemForm from './components/dashboard/FoundItemForm';
// import EditProfileForm from './components/auth/EditProfileForm';

// export default function App() {
//     const [page, setPage] = useState('home');
//     const [modalState, setModalState] = useState({ show: false, title: '', children: null, closing: false });
//     const [user, setUser] = useState(null);
//     const [allItems, setAllItems] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [dashboardResetKey, setDashboardResetKey] = useState(0);

//     const fetchItems = () => {
//         setIsLoading(true);
//         itemService.getItems()
//             .then(response => {
//                 setAllItems(response.data);
//                 setError('');
//                 setIsLoading(false);
//             })
//             .catch(err => {
//                 setError('Failed to fetch items.');
//                 setIsLoading(false);
//                 console.error("Fetch Error:", err);
//             });
//     };

//     useEffect(() => {
//         const currentUser = authService.getCurrentUser();
//         if (currentUser) {
//             setUser(currentUser);
//             setPage('dashboard');
//         }
//         fetchItems();
//     }, []);

//     const handleAuthSuccess = (data) => {
//         setUser(data.user);
//         setPage('dashboard');
//         handleCloseModal();
//     };

//     // This function is now more robust and guarantees a re-render.
//     const handleProfileUpdateSuccess = (updatedUser) => {
//         // Create a new user object by merging the old and new data.
//         // This ensures React detects the change and updates the UI.
//         setUser(prevUser => ({
//             ...prevUser,
//             ...updatedUser,
//         }));
//     };

//     const handleLogout = () => {
//         authService.logout(); 
//         setUser(null);
//         setPage('home');
//     };

//     const handleReportSubmitted = () => {
//         handleCloseModal();
//         fetchItems();
//     };

//     const handleShowModal = (type) => {
//         let content;
//         switch (type) {
//             case 'lost':
//                 content = { title: 'Report a Lost Item', children: <LostItemForm onReportSubmitted={handleReportSubmitted} handleClose={handleCloseModal} /> };
//                 break;
//             case 'found':
//                 content = { title: 'Post a Found Item', children: <FoundItemForm onReportSubmitted={handleReportSubmitted} handleClose={handleCloseModal} /> };
//                 break;
//             case 'auth':
//                 content = { title: null, children: <AuthForm onAuthSuccess={handleAuthSuccess} handleClose={handleCloseModal} /> };
//                 break;
//             case 'editProfile':
//                 content = { 
//                     title: null, 
//                     children: <EditProfileForm 
//                                 user={user} 
//                                 onUpdateSuccess={handleProfileUpdateSuccess} 
//                                 handleClose={handleCloseModal} 
//                               /> 
//                 };
//                 break;
//             default:
//                 return;
//         }
//         setModalState({ show: true, closing: false, ...content });
//     };

//     const handleCloseModal = () => {
//         setModalState(prev => ({ ...prev, closing: true }));
//         setTimeout(() => {
//             setModalState({ show: false, title: '', children: null, closing: false });
//         }, 500);
//     };

//     useEffect(() => {
//         const handleKeyDown = (e) => { if (e.key === 'Escape' && modalState.show) handleCloseModal(); };
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, [modalState.show]);

//     const handleGoHome = () => setPage('home');
//     const handleGoDashboard = () => {
//         if (page === 'dashboard') {
//             setDashboardResetKey(prev => prev + 1);
//         } else {
//             setPage('dashboard');
//         }
//     };

//     return (
//         <>
//             <Header
//                 user={user}
//                 onAuthClick={() => handleShowModal('auth')}
//                 onLogout={handleLogout}
//                 onGoHome={handleGoHome}
//                 onGoDashboard={handleGoDashboard}
//             />

//             {page === 'home' && <HomePage onAuthClick={() => handleShowModal('auth')} />}
//             {page === 'dashboard' && user && (
//                 user.role === 'admin'
//                     ? <AdminDashboard key={dashboardResetKey} user={user} />
//                     : <UserDashboard
//                         key={dashboardResetKey}
//                         user={user}
//                         onLogout={handleLogout}
//                         handleShowModal={handleShowModal}
//                         items={allItems}
//                         isLoading={isLoading}
//                         error={error}
//                       />
//             )}

//             <Modal
//                 show={modalState.show || modalState.closing}
//                 onClose={handleCloseModal}
//                 title={modalState.title}
//                 closing={modalState.closing}
//             >
//                 {modalState.children}
//             </Modal>
//         </>
//     );
// }



import React, { useState, useEffect } from 'react';
import './App.css';
import itemService from './services/itemService';
import authService from './services/authService';

// Import components
import Header from './components/common/Header';
import Modal from './components/common/Modal';
import HomePage from './components/home/HomePage';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AuthForm from './components/auth/AuthForm';
import LostItemForm from './components/dashboard/LostItemForm';
import FoundItemForm from './components/dashboard/FoundItemForm';
import EditProfileForm from './components/auth/EditProfileForm';

export default function App() {
    const [page, setPage] = useState('home');
    const [modalState, setModalState] = useState({ show: false, title: '', children: null, closing: false });
    const [user, setUser] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [dashboardResetKey, setDashboardResetKey] = useState(0);

    useEffect(() => {
        const initializeApp = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (token) {
                // This is a Google login callback
                localStorage.setItem('token', token);
                try {
                    // Fetch the full user details from the backend using the token
                    const userData = await authService.getMe(); 
                    if (userData) {
                        // Save the user details, set the user state, and switch to the dashboard
                        localStorage.setItem('user', JSON.stringify(userData));
                        setUser(userData);
                        setPage('dashboard');
                    }
                } catch (error) {
                    console.error("Failed to log in with Google token:", error);
                    authService.logout(); // Clean up if the token is invalid
                }
                // Clean the token from the URL without reloading the page
                window.history.replaceState({}, document.title, window.location.pathname);
            } else {
                // This is a normal page load, restore session from localStorage
                const currentUser = authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                    setPage('dashboard');
                }
            }
            
            fetchItems();
        };

        initializeApp();
    }, []);

    const fetchItems = () => {
        setIsLoading(true);
        itemService.getItems()
            .then(response => {
                setAllItems(response.data);
                setError('');
                setIsLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch items.');
                setIsLoading(false);
                console.error("Fetch Error:", err);
            });
    };

    const handleAuthSuccess = (data) => {
        setUser(data.user);
        setPage('dashboard');
        handleCloseModal();
    };

    const handleProfileUpdateSuccess = (updatedUser) => {
        setUser(prevUser => ({
            ...prevUser,
            ...updatedUser,
        }));
    };

    const handleLogout = () => {
        authService.logout(); 
        setUser(null);
        setPage('home');
    };

    const handleReportSubmitted = () => {
        handleCloseModal();
        fetchItems();
    };

    const handleShowModal = (type) => {
        let content;
        switch (type) {
            case 'lost':
                content = { title: 'Report a Lost Item', children: <LostItemForm onReportSubmitted={handleReportSubmitted} handleClose={handleCloseModal} /> };
                break;
            case 'found':
                content = { title: 'Post a Found Item', children: <FoundItemForm onReportSubmitted={handleReportSubmitted} handleClose={handleCloseModal} /> };
                break;
            case 'auth':
                content = { title: null, children: <AuthForm onAuthSuccess={handleAuthSuccess} handleClose={handleCloseModal} /> };
                break;
            case 'editProfile':
                content = { 
                    title: null, 
                    children: <EditProfileForm 
                                user={user} 
                                onUpdateSuccess={handleProfileUpdateSuccess} 
                                handleClose={handleCloseModal} 
                              /> 
                };
                break;
            default:
                return;
        }
        setModalState({ show: true, closing: false, ...content });
    };

    const handleCloseModal = () => {
        setModalState(prev => ({ ...prev, closing: true }));
        setTimeout(() => {
            setModalState({ show: false, title: '', children: null, closing: false });
        }, 500);
    };

    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape' && modalState.show) handleCloseModal(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalState.show]);

    const handleGoHome = () => setPage('home');
    const handleGoDashboard = () => {
        if (page === 'dashboard') {
            setDashboardResetKey(prev => prev + 1);
        } else {
            setPage('dashboard');
        }
    };

    return (
        <>
            <Header
                user={user}
                onAuthClick={() => handleShowModal('auth')}
                onLogout={handleLogout}
                onGoHome={handleGoHome}
                onGoDashboard={handleGoDashboard}
            />

            {page === 'home' && <HomePage onAuthClick={() => handleShowModal('auth')} />}
            {page === 'dashboard' && user && (
                user.role === 'admin'
                    ? <AdminDashboard key={dashboardResetKey} user={user} />
                    : <UserDashboard
                        key={dashboardResetKey}
                        user={user}
                        onLogout={handleLogout}
                        handleShowModal={handleShowModal}
                        items={allItems}
                        isLoading={isLoading}
                        error={error}
                      />
            )}

            <Modal
                show={modalState.show || modalState.closing}
                onClose={handleCloseModal}
                title={modalState.title}
                closing={modalState.closing}
            >
                {modalState.children}
            </Modal>
        </>
    );
}
