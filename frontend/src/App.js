// import React, { useState, useEffect } from 'react';
// import './App.css';
// import itemService from './services/itemService';
// import authService from './services/authService'; // Make sure this is imported

// // Import components
// import Header from './components/common/Header';
// import Modal from './components/common/Modal';
// import HomePage from './components/home/HomePage';
// import UserDashboard from './components/dashboard/UserDashboard';
// import AdminDashboard from './components/dashboard/AdminDashboard';
// import AuthForm from './components/auth/AuthForm';
// import LostItemForm from './components/dashboard/LostItemForm';
// import FoundItemForm from './components/dashboard/FoundItemForm';

// export default function App() {
//     const [page, setPage] = useState('home');
//     const [modalState, setModalState] = useState({ show: false, title: '', children: null, closing: false });
//     const [user, setUser] = useState(null);
//     const [allItems, setAllItems] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');

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

//     // This effect correctly restores the user session on refresh
//     useEffect(() => {
//         const currentUser = authService.getCurrentUser();
//         if (currentUser) {
//             setUser(currentUser);
//             setPage('dashboard');
//         }
//         fetchItems();
//     }, []);
    
//     // This function is called after a successful login
//     const handleAuthSuccess = (data) => {
//         setUser(data.user);
//         setPage('dashboard');
//         handleCloseModal();
//     };

//     // --- THIS IS THE CORRECTED LOGOUT FUNCTION ---
//     const handleLogout = () => {
//         // This critical line removes the token and user from localStorage
//         authService.logout(); 

//         // These lines reset the application's state
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

//     return (
//         <>
//             <Header
//                 user={user}
//                 onAuthClick={() => handleShowModal('auth')}
//                 onLogout={handleLogout}
//             />

//             {page === 'home' && <HomePage onAuthClick={() => handleShowModal('auth')} />}
//             {page === 'dashboard' && user && (
//                 user.role === 'admin'
//                     ? <AdminDashboard user={user} />
//                     : <UserDashboard
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

// export default function App() {
//     const [page, setPage] = useState('home');
//     const [modalState, setModalState] = useState({ show: false, title: '', children: null, closing: false });
//     const [user, setUser] = useState(null);
//     const [allItems, setAllItems] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');

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

//     // 👇 NEW: Handler to navigate to the Home page
//     const handleGoHome = () => setPage('home');
//     // 👇 NEW: Handler to navigate to the Dashboard page
//     const handleGoDashboard = () => setPage('dashboard');

//     return (
//         <>
//             <Header
//                 user={user}
//                 onAuthClick={() => handleShowModal('auth')}
//                 onLogout={handleLogout}
//                 // 👇 NEW: Pass the navigation handlers to the Header component
//                 onGoHome={handleGoHome}
//                 onGoDashboard={handleGoDashboard}
//             />

//             {page === 'home' && <HomePage onAuthClick={() => handleShowModal('auth')} />}
//             {page === 'dashboard' && user && (
//                 user.role === 'admin'
//                     ? <AdminDashboard user={user} />
//                     : <UserDashboard
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

export default function App() {
    const [page, setPage] = useState('home');
    const [modalState, setModalState] = useState({ show: false, title: '', children: null, closing: false });
    const [user, setUser] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [dashboardResetKey, setDashboardResetKey] = useState(0); // 👈 NEW

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

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setPage('dashboard');
        }
        fetchItems();
    }, []);

    const handleAuthSuccess = (data) => {
        setUser(data.user);
        setPage('dashboard');
        handleCloseModal();
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

    // 👇 Navigation Handlers
    const handleGoHome = () => setPage('home');
    const handleGoDashboard = () => {
        if (page === 'dashboard') {
            // Trigger a re-render/reset for dashboard content
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
                        key={dashboardResetKey} // 👈 forces dashboard to reset when same button clicked
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
