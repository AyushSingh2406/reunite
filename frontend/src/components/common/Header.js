// import React from 'react';

// const Header = ({ user, onAuthClick, onLogout }) => {
//     return (
//         <header className="page-header">
//             <div className="logo">reunite.</div>
//             <nav className="main-nav">
//                 {user ? (
//                     <>
//                         <span className="welcome-user">Hi, {user.username || user.email.split('@')[0]}</span>
//                         <button onClick={onLogout} className="nav-btn signup">Sign Out</button>
//                     </>
//                 ) : (
//                     <button onClick={onAuthClick} className="nav-btn signup">Sign In</button>
//                 )}
//             </nav>
//         </header>
//     );
// };

// export default Header;


// import React from 'react';

// // This component assumes you have some CSS for .header, .nav-buttons, and .auth-buttons
// export default function Header({ user, onAuthClick, onLogout, onGoHome, onGoDashboard }) {
//   return (
//     <header className="header">
//       <h1 className="logo">reunite.</h1>
//       <nav className="nav-buttons">
//         <button onClick={onGoHome} className="nav-btn">Home</button>
//         {/* 👇 Conditionally render the Dashboard button only if a user is logged in */}
//         {user && <button onClick={onGoDashboard} className="nav-btn">Dashboard</button>}
//       </nav>
//       <div className="auth-buttons">
//         {user ? (
//           <>
//             <span className="user-greeting">Hi, {user.username}</span>
//             <button onClick={onLogout} className="auth-btn">Sign Out</button>
//           </>
//         ) : (
//           <button onClick={onAuthClick} className="auth-btn">Sign In</button>
//         )}
//       </div>
//     </header>
//   );
// }


import React from 'react';

export default function Header({ user, onAuthClick, onLogout, onGoHome, onGoDashboard }) {
  // New: keep everything else the same, add a local handler that
  // triggers a dashboard refresh event if we're already on the dashboard.
  const handleGoDashboard = () => {
    try {
      const href = window.location.href || '';
      const pathname = window.location.pathname || '';
      const isDashboardPath = pathname.includes('/dashboard') || href.includes('#/dashboard');

      if (isDashboardPath) {
        // notify dashboard to reset / switch tab
        window.dispatchEvent(new CustomEvent('dashboardRefresh', { detail: { source: 'header' } }));
      } else {
        // call the original handler passed in props
        if (typeof onGoDashboard === 'function') onGoDashboard();
      }
    } catch (err) {
      // fallback to calling the original handler
      if (typeof onGoDashboard === 'function') onGoDashboard();
    }
  };

  return (
    <header className="header transparent-header">
      {/* Logo */}
      <h1 className="logo">reunite.</h1>

      {/* Right section */}
      <div className="header-right">
        {user ? (
          <>
            <span className="user-greeting">Hi, {user.username}</span>
            <button onClick={onGoHome} className="icon-btn" title="Home">
              <i className="fas fa-home"></i>
            </button>
            <button onClick={handleGoDashboard} className="icon-btn" title="Dashboard">
              <i className="fas fa-user-circle"></i>
            </button>
            <button onClick={onLogout} className="auth-btn">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={onAuthClick} className="auth-btn">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
