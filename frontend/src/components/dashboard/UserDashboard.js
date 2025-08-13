// import React, { useState, useEffect } from 'react';
// import itemService from '../../services/itemService'; // Import the service
// import DropdownSidebar from './DropdownSidebar';
// import ItemCard from './ItemCard';

// const UserDashboard = ({ handleShowModal, user, onLogout }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [allItems, setAllItems] = useState([]); // State for items
//     const [isLoading, setIsLoading] = useState(true); // Loading state
//     const [error, setError] = useState(''); // Error state
    
//     // States for filtering
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('all');

//     const fetchItems = () => {
//         setIsLoading(true);
//         itemService.getItems()
//             .then(response => {
//                 setAllItems(response.data);
//                 setIsLoading(false);
//             })
//             .catch(err => {
//                 setError('Failed to fetch items. Please try again later.');
//                 setIsLoading(false);
//                 console.error(err);
//             });
//     };

//     useEffect(() => {
//         fetchItems();
//     }, []); // The empty array [] means this effect runs once when the component mounts

//     const uniqueCategories = ['all', ...new Set(allItems.map(item => item.category))];

//     const getVisibleItems = () => {
//         let items = allItems;
//         if (selectedCategory !== 'all') {
//             items = items.filter(item => item.category === selectedCategory);
//         }
//         if (searchTerm) {
//             items = items.filter(item => 
//                 item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 item.location.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
//         return items;
//     };
    
//     // Pass fetchItems to the modal so it can refresh the list after a new post
//     const showItemModal = (type, event) => {
//         handleShowModal(type, event, fetchItems);
//     }

//     return (
//         <>
//             <DropdownSidebar user={user} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onLogout={onLogout} />
//             <main className="main-container dashboard-page-new">
//                  <div className="dashboard-header">
//                     <h2 className="dashboard-title">Welcome, {user.username}</h2>
//                     <div className="dashboard-user-actions">
//                         <button className="icon-btn"><i className="fas fa-bell"></i></button>
//                         <button className="icon-btn" onClick={() => setIsSidebarOpen(true)}><i className="fas fa-user-circle"></i></button>
//                     </div>
//                 </div>
//                  <div className="dashboard-actions">
//                     <button onClick={(e) => showItemModal('lost', e)} className="cred-btn">Report a Lost Item</button>
//                     <button onClick={(e) => showItemModal('found', e)} className="cred-btn">Post a Found Item</button>
//                 </div>
//                  <div className="filters-container">
//                     <div className="search-bar-container">
//                         <i className="fas fa-search search-icon"></i>
//                         <input 
//                             type="text" 
//                             placeholder="Search by item, keyword, or location..." 
//                             className="search-input"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                      <div className="category-filter-container">
//                         <select className="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                             {uniqueCategories.map(cat => (
//                                 <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {isLoading && <p>Loading items...</p>}
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
                
//                 {!isLoading && !error && (
//                     <div className="item-grid">
//                         {getVisibleItems().length > 0 ? (
//                             getVisibleItems().map(item => <ItemCard key={item._id} item={item} />)
//                         ) : (
//                             <p>No items found.</p>
//                         )}
//                     </div>
//                 )}
//             </main>
//         </>
//     );
// };

// export default UserDashboard;



// import React, { useState } from 'react';
// import DropdownSidebar from './DropdownSidebar';
// import ItemCard from './ItemCard';

// const UserDashboard = ({ handleShowModal, user, onLogout, items, isLoading, error }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
//     // States for filtering are managed here
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('all');

//     // Derive unique categories from the items prop passed down from App.js
//     // Added a check to ensure 'items' is an array before mapping
//     const uniqueCategories = ['all', ...new Set(
//     Array.isArray(items) 
//       ? items
//           .map(item => item.category) // 1. Get all categories from the items
//           .filter(Boolean)            // 2. IMPORTANT: Filter out any null, undefined, or empty values
//       : []
// )];

//     // This function now filters the 'items' prop
//     const getVisibleItems = () => {
//         // Ensure items is an array before trying to filter
//         if (!Array.isArray(items)) {
//             return [];
//         }
        
//         let filteredItems = items;

//         if (selectedCategory !== 'all') {
//             filteredItems = filteredItems.filter(item => item.category === selectedCategory);
//         }

//         if (searchTerm) {
//             const lowercasedTerm = searchTerm.toLowerCase();
//             filteredItems = filteredItems.filter(item => 
//                 item.itemName.toLowerCase().includes(lowercasedTerm) ||
//                 item.location.toLowerCase().includes(lowercasedTerm) ||
//                 item.description.toLowerCase().includes(lowercasedTerm)
//             );
//         }
//         return filteredItems;
//     };

//     return (
//         <>
//             <DropdownSidebar user={user} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onLogout={onLogout} />
//             <main className="main-container dashboard-page-new">
//                  <div className="dashboard-header">
//                     <h2 className="dashboard-title">Welcome, {user.username}</h2>
//                     <div className="dashboard-user-actions">
//                         <button className="icon-btn"><i className="fas fa-bell"></i></button>
//                         <button className="icon-btn" onClick={() => setIsSidebarOpen(true)}><i className="fas fa-user-circle"></i></button>
//                     </div>
//                 </div>
//                  <div className="dashboard-actions">
//                     {/* These buttons now correctly call the handleShowModal function from App.js */}
//                     <button onClick={() => handleShowModal('lost')} className="cred-btn">Report a Lost Item</button>
//                     <button onClick={() => handleShowModal('found')} className="cred-btn">Post a Found Item</button>
//                 </div>
//                  <div className="filters-container">
//                     <div className="search-bar-container">
//                         <i className="fas fa-search search-icon"></i>
//                         <input 
//                             type="text" 
//                             placeholder="Search by item, keyword, or location..." 
//                             className="search-input"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                      <div className="category-filter-container">
//                         <select className="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                             {uniqueCategories.map(cat => (
//                                 <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {/* The component now uses the isLoading and error props from App.js */}
//                 {isLoading && <p>Loading items...</p>}
//                 {error && <p className="auth-error">{error}</p>}
                
//                 {!isLoading && !error && (
//                     <div className="item-grid">
//                         {getVisibleItems().length > 0 ? (
//                             getVisibleItems().map(item => <ItemCard key={item._id} item={item} currentUser={user}/>)
//                         ) : (
//                             <p>No items found matching your criteria.</p>
//                         )}
//                     </div>
//                 )}
//             </main>
//         </>
//     );
// };

// export default UserDashboard;


// src/components/dashboard/UserDashboard.js

// import React, { useState } from 'react';
// import DropdownSidebar from './DropdownSidebar';
// import ItemCard from './ItemCard';
// import MyClaimsPage from './MyClaimsPage';

// // The UserDashboard now receives the full user object from App.js
// const UserDashboard = ({ handleShowModal, user, onLogout, items, isLoading, error }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [chatItem, setChatItem] = useState(null);
//     // NEW: State to control the main view filter
//     const [viewFilter, setViewFilter] = useState('all'); // 'all', 'myLost', 'myFound', 'myClaimed'

//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('all');

//     const uniqueCategories = ['all', ...new Set(Array.isArray(items) ? items.map(item => item.category).filter(Boolean) : [])];

//     // UPDATED: This function is now more powerful and handles all views
//     const getVisibleItems = () => {
//         if (!Array.isArray(items)) return [];
        
//         let visibleItems = [];

//         // Apply the main view filter first
//         switch (viewFilter) {
//             case 'myLost':
//                 visibleItems = items.filter(item => item.user._id === user.id && item.status === 'Lost');
//                 break;
//             case 'myFound':
//                 visibleItems = items.filter(item => item.user._id === user.id && item.status === 'Found');
//                 break;
//             case 'myClaimed':
//                 visibleItems = items.filter(item => item.status === 'Claimed' && (item.user._id === user.id || item.claimedBy === user.id));
//                 break;
//             default: // 'all'
//                 visibleItems = items;
//                 break;
//         }

//         // Then, apply the search and category filters on top
//         if (selectedCategory !== 'all') {
//             visibleItems = visibleItems.filter(item => item.category === selectedCategory);
//         }
//         if (searchTerm) {
//             const lowercasedTerm = searchTerm.toLowerCase();
//             visibleItems = visibleItems.filter(item => 
//                 item.itemName.toLowerCase().includes(lowercasedTerm) ||
//                 item.location.toLowerCase().includes(lowercasedTerm)
//             );
//         }
//         return visibleItems;
//     };

//     return (
//         <>
//             {/* Pass the setViewFilter function down to the sidebar */}
//             <DropdownSidebar 
//                 user={user} 
//                 isOpen={isSidebarOpen} 
//                 onClose={() => setIsSidebarOpen(false)} 
//                 onLogout={onLogout}
//                 onSetViewFilter={setViewFilter} 
//             />
//             <main className="main-container dashboard-page-new">
//                 <div className="dashboard-header">
//                     <h2 className="dashboard-title">Welcome, {user.username}</h2>
//                     <div className="dashboard-user-actions">
//                         <button onClick={() => setViewFilter('all')} className="icon-btn"><i className="fas fa-home"></i></button>
//                         <button className="icon-btn" onClick={() => setIsSidebarOpen(true)}><i className="fas fa-user-circle"></i></button>
//                     </div>
//                 </div>
//                  <div className="dashboard-actions">
//                     <button onClick={() => handleShowModal('lost')} className="cred-btn">Report a Lost Item</button>
//                     <button onClick={() => handleShowModal('found')} className="cred-btn">Post a Found Item</button>
//                 </div>
                

//                 <div className="filters-container">
//                     <div className="search-bar-container">
//                         <i className="fas fa-search search-icon"></i>
//                         <input 
//                             type="text" 
//                             placeholder="Search by item, keyword, or location..." 
//                             className="search-input"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                      <div className="category-filter-container">
//                         <select className="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                             {uniqueCategories.map(cat => (
//                                 <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {isLoading && <p>Loading items...</p>}
//                 {error && <p className="auth-error">{error}</p>}
                
//                 {!isLoading && !error && (
//                     <div className="item-grid">
//                         {getVisibleItems().length > 0 ? (
//                             getVisibleItems().map(item => (
//                                 <ItemCard key={item._id} item={item} currentUser={user} />
//                             ))
//                         ) : (
//                             <p>No items found.</p>
//                         )}
//                     </div>
//                 )}
//             </main>
//         </>
//     );
// };

// export default UserDashboard;

import React, { useState } from 'react';
import DropdownSidebar from './DropdownSidebar';
import ItemCard from './ItemCard';
import MyClaimsPage from './MyClaimsPage';
import ChatModal from './ChatModal';

const UserDashboard = ({ handleShowModal, user, onLogout, items, isLoading, error }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [viewFilter, setViewFilter] = useState('all');
    const [chatItem, setChatItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const uniqueCategories = ['all', ...new Set(Array.isArray(items) ? items.map(item => item.category).filter(Boolean) : [])];

    const getVisibleItems = () => {
        if (!Array.isArray(items)) return [];
        let visibleItems = items;
        if (selectedCategory !== 'all') {
            visibleItems = visibleItems.filter(item => item.category === selectedCategory);
        }
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            visibleItems = visibleItems.filter(item => 
                item.itemName.toLowerCase().includes(lowercasedTerm) ||
                item.location.toLowerCase().includes(lowercasedTerm)
            );
        }
        return visibleItems;
    };

    return (
        <>
            <DropdownSidebar 
                user={user} 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                onLogout={onLogout}
                onSetViewFilter={setViewFilter} 
            />
            <main className="main-container dashboard-page-new">
                {/* --- THIS IS THE CRITICAL LOGIC --- */}
                {/* It checks the 'viewFilter' state to decide what to show */}
                {viewFilter === 'myClaimed' ? (
                    <MyClaimsPage items={items} user={user} onOpenChat={setChatItem} />
                ) : (
                    <>
                        <div className="dashboard-header">
                            <h2 className="dashboard-title">Welcome, {user.username}</h2>
                            <div className="dashboard-user-actions">
                                <button title="Show All Items" onClick={() => setViewFilter('all')} className="icon-btn"><i className="fas fa-home"></i></button>
                                <button className="icon-btn" onClick={() => setIsSidebarOpen(true)}><i className="fas fa-user-circle"></i></button>
                            </div>
                        </div>
                        <div className="dashboard-actions">
                            <button onClick={() => handleShowModal('lost')} className="cred-btn">Report a Lost Item</button>
                            <button onClick={() => handleShowModal('found')} className="cred-btn">Post a Found Item</button>
                        </div>
                        <div className="filters-container">
                            <div className="search-bar-container">
                                <i className="fas fa-search search-icon"></i>
                                <input type="text" placeholder="Search by item, keyword, or location..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <div className="category-filter-container">
                                <select className="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                    {uniqueCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {isLoading && <p>Loading items...</p>}
                        {error && <p className="auth-error">{error}</p>}
                        
                        {!isLoading && !error && (
                            <div className="item-grid">
                                {getVisibleItems().length > 0 ? (
                                    getVisibleItems().map(item => (
                                        <ItemCard key={item._id} item={item} currentUser={user} />
                                    ))
                                ) : (
                                    <p>No items found.</p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>

            {chatItem && (
                <ChatModal 
                    item={chatItem}
                    user={user}
                    onClose={() => setChatItem(null)}
                />
            )}
        </>
    );
};

export default UserDashboard;
