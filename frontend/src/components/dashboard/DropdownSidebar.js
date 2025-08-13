// import React, { useState } from 'react';

// const DropdownSidebar = ({ user, isOpen, onClose, onLogout }) => {
//     const [openMenus, setOpenMenus] = useState({});

//     const toggleMenu = (menu) => {
//         setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
//     };

//     return (
//         <>
//             <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
//             <nav className={`dropdown-sidebar ${isOpen ? 'show' : ''}`}>
//                 <div className="sidebar-header">
//                     <h3>My Profile</h3>
//                     <button onClick={onClose} className="close-sidebar-btn"><i className="fas fa-times"></i></button>
//                 </div>
//                 <div className="sidebar-profile-details">
//                     <p><strong>Name:</strong> {user.username}</p>
//                     <p><strong>College ID:</strong> 12345 <span className="verified-badge">✔ Verified</span></p>
//                     <p><strong>Address:</strong> 123 College Rd, Campus City</p>
//                     <button className="edit-profile-btn">Edit Profile</button>
//                 </div>

//                 <div className="sidebar-menu-section">
//                     <button className="sidebar-menu-toggle" onClick={() => toggleMenu('reports')}>
//                         📂 My Reports <i className={`fas fa-chevron-down ${openMenus['reports'] ? 'open' : ''}`}></i>
//                     </button>
//                     {openMenus['reports'] && (
//                         <ul className="sidebar-submenu">
//                             <li><a href="#lost">Lost Items</a></li>
//                             <li><a href="#found">Found Items</a></li>
//                             <li><a href="#archived">Archived Reports</a></li>
//                         </ul>
//                     )}
//                 </div>
                
//                 <div className="sidebar-menu-section">
//                     <button className="sidebar-menu-toggle" onClick={() => toggleMenu('settings')}>
//                         ⚙️ Settings <i className={`fas fa-chevron-down ${openMenus['settings'] ? 'open' : ''}`}></i>
//                     </button>
//                     {openMenus['settings'] && (
//                         <ul className="sidebar-submenu">
//                             <li><a href="#theme">Theme & Privacy</a></li>
//                             <li><a href="#terms">Terms & Policies</a></li>
//                         </ul>
//                     )}
//                 </div>
                
//                 <a href="#guidelines" className="sidebar-link">📜 College Guidelines</a>
//                 <a href="#help" className="sidebar-link">❓ Help and Support</a>
//                 <button onClick={onLogout} className="sidebar-logout-btn">🚪 Logout</button>
//             </nav>
//         </>
//     );
// };

// export default DropdownSidebar;

// src/components/dashboard/DropdownSidebar.js
import React, { useState } from 'react';

const DropdownSidebar = ({ user, isOpen, onClose, onLogout, onSetViewFilter }) => {
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
    };

    // This function tells the parent dashboard to change the view
    const handleFilterClick = (filter) => {
        onSetViewFilter(filter);
        onClose(); // Close the sidebar after selection
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
            <nav className={`dropdown-sidebar ${isOpen ? 'show' : ''}`}>
                <div className="sidebar-header">
                    <h3>My Profile</h3>
                    <button onClick={onClose} className="close-sidebar-btn"><i className="fas fa-times"></i></button>
                </div>
                <div className="sidebar-profile-details">
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>College ID:</strong> 12345 <span className="verified-badge">✔ Verified</span></p>
                    <p><strong>Address:</strong> 123 College Rd, Campus City</p>
                    <button className="edit-profile-btn">Edit Profile</button>
                </div>

                <div className="sidebar-menu-section">
                    <button className="sidebar-menu-toggle" onClick={() => toggleMenu('reports')}>
                        📂 My Reports <i className={`fas fa-chevron-down ${openMenus['reports'] ? 'open' : ''}`}></i>
                    </button>
                    {openMenus['reports'] && (
                        <ul className="sidebar-submenu">
                            {/* --- THIS IS THE CRITICAL LOGIC --- */}
                            {/* These buttons now call the handleFilterClick function */}
                            <li><button onClick={() => handleFilterClick('myLost')}>Lost Items Reported</button></li>
                            <li><button onClick={() => handleFilterClick('myFound')}>Found Items Reported</button></li>
                            <li><button onClick={() => handleFilterClick('myClaimed')}>Claimed Items</button></li>
                        </ul>
                    )}
                </div>
                
                <div className="sidebar-menu-section">
                    <button className="sidebar-menu-toggle" onClick={() => toggleMenu('settings')}>
                        ⚙️ Settings <i className={`fas fa-chevron-down ${openMenus['settings'] ? 'open' : ''}`}></i>
                    </button>
                    {openMenus['settings'] && (
                        <ul className="sidebar-submenu">
                            <li><button>Theme & Privacy</button></li>
                            <li><button>Terms & Policies</button></li>
                        </ul>
                    )}
                </div>
                
                <button className="sidebar-link">📜 College Guidelines</button>
                <button className="sidebar-link">❓ Help and Support</button>
                <button onClick={onLogout} className="sidebar-logout-btn">🚪 Logout</button>
            </nav>
        </>
    );
};

export default DropdownSidebar;