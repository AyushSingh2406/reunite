// // frontend/src/components/dashboard/MyClaimsPage.js
// import React from 'react';
// import { format } from 'date-fns';

// const MyClaimsPage = ({ items, user, onOpenChat }) => {
//     // Filter for items that are 'Claimed' and involve the current user
//     const claimedItems = items.filter(item => 
//         item.status === 'Claimed' &&
//         (item.user?._id === user.id || item.claimedBy?._id === user.id)
//     );

//     return (
//         <div className="my-claims-container">
//             <h2 className="dashboard-title">My Active Claims</h2>
//             <p>This section lists items you've lost that have been claimed by others, and items you've claimed.</p>
//             <hr />
//             {claimedItems.length === 0 ? (
//                 <p>You have no active claims.</p>
//             ) : (
//                 <div className="claims-list">
//                     {claimedItems.map(item => (
//                         <div key={item._id} className="claim-card">
//                             <img src={item.imageUrl} alt={item.itemName} className="claim-card-image" />
//                             <div className="claim-card-info">
//                                 <h4>{item.itemName}</h4>
//                                 <p><strong>Reported by:</strong> {item.user?.username || 'N/A'}</p>
//                                 <p><strong>Claimed by:</strong> {item.claimedBy?.username || 'N/A'}</p>
//                                 <p><strong>Date Reported:</strong> {format(new Date(item.date), 'MMM dd, yyyy')}</p>
//                             </div>
//                             <div className="claim-card-actions">
//                                 <button onClick={() => onOpenChat(item)} className="cred-btn">
//                                     Open Chat
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyClaimsPage;

// frontend/src/components/dashboard/MyClaimsPage.js
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import itemService from '../../services/itemService';

const MyClaimsPage = ({ items, user, onOpenChat }) => {
    // We give the component its own state to manage for easier updates
    const [myClaimedItems, setMyClaimedItems] = useState([]);

    useEffect(() => {
        const filteredItems = items.filter(item => 
            item.status === 'Claimed' &&
            (item.user?._id === user.id || item.claimedBy?._id === user.id)
        );
        setMyClaimedItems(filteredItems);
    }, [items, user.id]);

    const handleResolve = async (itemId) => {
        if (!window.confirm("Are you sure you want to mark this item as resolved? This action cannot be undone.")) {
            return;
        }
        try {
            await itemService.resolveItem(itemId);
            // Remove the item from the view instantly for a better user experience
            setMyClaimedItems(myClaimedItems.filter(item => item._id !== itemId));
            alert("Claim successfully resolved!");
        } catch (err) {
            alert(err.response?.data?.msg || "Failed to resolve claim.");
        }
    };

    return (
        <div className="my-claims-container">
            <h2 className="dashboard-title">My Active Claims</h2>
            <p>This section lists items you've lost that have been claimed by others, and items you've claimed.</p>
            <hr />
            {myClaimedItems.length === 0 ? (
                <p>You have no active claims.</p>
            ) : (
                <div className="claims-list">
                    {myClaimedItems.map(item => {
                        const isOwner = user.id === item.user?._id;
                        return (
                            <div key={item._id} className="claim-card">
                                <img src={item.imageUrl} alt={item.itemName} className="claim-card-image" />
                                <div className="claim-card-info">
                                    <h4>{item.itemName}</h4>
                                    <p><strong>Reported by:</strong> {item.user?.username || 'N/A'}</p>
                                    <p><strong>Claimed by:</strong> {item.claimedBy?.username || 'N/A'}</p>
                                </div>
                                <div className="claim-card-actions">
                                    <button onClick={() => onOpenChat(item)} className="cred-btn">
                                        Open Chat
                                    </button>
                                    {/* --- NEW: The Resolve Button --- */}
                                    {isOwner && (
                                        <button onClick={() => handleResolve(item._id)} className="cred-btn resolve-btn">
                                            Mark as Resolved
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyClaimsPage;