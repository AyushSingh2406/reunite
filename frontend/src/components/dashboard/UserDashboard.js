// import React, { useState } from 'react';
// import DropdownSidebar from './DropdownSidebar';
// import ItemCard from './ItemCard';
// import MyClaimsPage from './MyClaimsPage';
// import ChatModal from './ChatModal';

// const UserDashboard = ({ handleShowModal, user, onLogout, items, isLoading, error }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [viewFilter, setViewFilter] = useState('all');
//     const [chatItem, setChatItem] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('all');

//     const uniqueCategories = ['all', ...new Set(Array.isArray(items) ? items.map(item => item.category).filter(Boolean) : [])];

//     const getVisibleItems = () => {
//         if (!Array.isArray(items)) return [];
//         let visibleItems = items;
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
//             <DropdownSidebar 
//                 user={user} 
//                 isOpen={isSidebarOpen} 
//                 onClose={() => setIsSidebarOpen(false)} 
//                 onLogout={onLogout}
//                 onSetViewFilter={setViewFilter} 
//             />
//             <main className="main-container dashboard-page-new">
//                 {/* --- THIS IS THE CRITICAL LOGIC --- */}
//                 {/* It checks the 'viewFilter' state to decide what to show */}
//                 {viewFilter === 'myClaimed' ? (
//                     <MyClaimsPage items={items} user={user} onOpenChat={setChatItem} />
//                 ) : (
//                     <>
//                         <div className="dashboard-header">
//                             <h2 className="dashboard-title">Welcome, {user.username}</h2>
//                             <div className="dashboard-user-actions">
//                                 <button title="Show All Items" onClick={() => setViewFilter('all')} className="icon-btn"><i className="fas fa-home"></i></button>
//                                 <button className="icon-btn" onClick={() => setIsSidebarOpen(true)}><i className="fas fa-user-circle"></i></button>
//                             </div>
//                         </div>
//                         <div className="dashboard-actions">
//                             <button onClick={() => handleShowModal('lost')} className="cred-btn">Report a Lost Item</button>
//                             <button onClick={() => handleShowModal('found')} className="cred-btn">Post a Found Item</button>
//                         </div>
//                         <div className="filters-container">
//                             <div className="search-bar-container">
//                                 <i className="fas fa-search search-icon"></i>
//                                 <input type="text" placeholder="Search by item, keyword, or location..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                             </div>
//                             <div className="category-filter-container">
//                                 <select className="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                                     {uniqueCategories.map(cat => (
//                                         <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
                        
//                         {isLoading && <p>Loading items...</p>}
//                         {error && <p className="auth-error">{error}</p>}
                        
//                         {!isLoading && !error && (
//                             <div className="item-grid">
//                                 {getVisibleItems().length > 0 ? (
//                                     getVisibleItems().map(item => (
//                                         <ItemCard key={item._id} item={item} currentUser={user} />
//                                     ))
//                                 ) : (
//                                     <p>No items found.</p>
//                                 )}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </main>

//             {chatItem && (
//                 <ChatModal 
//                     item={chatItem}
//                     user={user}
//                     onClose={() => setChatItem(null)}
//                 />
//             )}
//         </>
//     );
// };

// export default UserDashboard;




// import React, { useState } from 'react';
// import DropdownSidebar from './DropdownSidebar';
// import ItemCard from './ItemCard';
// import MyClaimsPage from './MyClaimsPage';
// import ChatModal from './ChatModal';

// const UserDashboard = ({ handleShowModal, user, onLogout, items, isLoading, error }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [viewFilter, setViewFilter] = useState('all');
//     const [chatItem, setChatItem] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('all');

//     const uniqueCategories = ['all', ...new Set(Array.isArray(items) ? items.map(item => item.category).filter(Boolean) : [])];

//     const getVisibleItems = () => {
//         if (!Array.isArray(items)) return [];
//         let visibleItems = items;
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
//             <DropdownSidebar 
//                 user={user} 
//                 isOpen={isSidebarOpen} 
//                 onClose={() => setIsSidebarOpen(false)} 
//                 onLogout={onLogout}
//                 onSetViewFilter={setViewFilter} 
//             />
//             <main className="main-container dashboard-page-new">
//                 {viewFilter === 'myClaimed' ? (
//                     <MyClaimsPage items={items} user={user} onOpenChat={setChatItem} />
//                 ) : (
//                     <>
//                         <div className="dashboard-header">
//                             <h2 className="dashboard-title">Welcome, {user.username}</h2>
//                             {/* --- UI REFRESH --- */}
//                             <div className="dashboard-user-actions">
//                                 {/* The redundant home button has been removed. */}
//                                 {/* The user icon is replaced with a menu icon to open the sidebar. */}
//                                 <button className="icon-btn" onClick={() => setIsSidebarOpen(true)} title="Open Menu">
//                                     <i className="fas fa-bars"></i>
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="dashboard-actions">
//                             <button onClick={() => handleShowModal('lost')} className="cred-btn">Report a Lost Item</button>
//                             <button onClick={() => handleShowModal('found')} className="cred-btn">Post a Found Item</button>
//                         </div>
//                         <div className="filters-container">
//                             <div className="search-bar-container">
//                                 <i className="fas fa-search search-icon"></i>
//                                 <input type="text" placeholder="Search by item, keyword, or location..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                             </div>
//                             <div className="category-filter-container">
//                                 <select className="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                                     {uniqueCategories.map(cat => (
//                                         <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
                        
//                         {isLoading && <p>Loading items...</p>}
//                         {error && <p className="auth-error">{error}</p>}
                        
//                         {!isLoading && !error && (
//                             <div className="item-grid">
//                                 {getVisibleItems().length > 0 ? (
//                                     getVisibleItems().map(item => (
//                                         <ItemCard key={item._id} item={item} currentUser={user} />
//                                     ))
//                                 ) : (
//                                     <p>No items found.</p>
//                                 )}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </main>

//             {chatItem && (
//                 <ChatModal 
//                     item={chatItem}
//                     user={user}
//                     onClose={() => setChatItem(null)}
//                 />
//             )}
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
                // This passes the function down to the sidebar component
                onEditProfile={() => handleShowModal('editProfile')}
            />
            <main className="main-container dashboard-page-new">
                {viewFilter === 'myClaimed' ? (
                    <MyClaimsPage items={items} user={user} onOpenChat={setChatItem} />
                ) : (
                    <>
                        <div className="dashboard-header">
                            <h2 className="dashboard-title">Welcome, {user.username}</h2>
                            <div className="dashboard-user-actions">
                                <button className="icon-btn" onClick={() => setIsSidebarOpen(true)} title="Open Menu">
                                    <i className="fas fa-bars"></i>
                                </button>
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
