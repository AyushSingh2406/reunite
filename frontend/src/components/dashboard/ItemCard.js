// import React from 'react';

// const ItemCard = ({ item }) => {
//     const { name, status, location, imageUrl } = item;
//     return (
//         <div className="item-card">
//             <img src={imageUrl} alt={name} className="item-card-image" />
//             <div className="item-card-info">
//                 <h4 className="item-card-title">{name}</h4>
//                 <p className="item-card-location">{location}</p>
//                 <span className={`item-card-status ${status.toLowerCase()}`}>{status}</span>
//             </div>
//         </div>
//     );
// };

// export default ItemCard;

// src/components/dashboard/ItemCard.js

// import React from 'react';
// import itemService from '../../services/itemService';

// // The card now needs to know who the logged-in user is
// const ItemCard = ({ item, currentUser }) => {
    
//     const handleClaim = async () => {
//         if (!window.confirm("Are you sure you want to claim you have this item? This will notify the owner.")) {
//             return;
//         }
//         try {
//             await itemService.claimItem(item._id);
//             alert("Claim successful! The owner has been notified.");
//             // In a real app, you would refresh the state here
//             window.location.reload(); 
//         } catch (err) {
//             alert(err.response?.data?.msg || "Failed to claim item.");
//         }
//     };

//     const isOwner = currentUser && currentUser.id === item.user._id;
//     const canBeClaimed = item.status === 'Lost' && !isOwner;

//     return (
//         <div className="item-card">
//             <img src={item.imageUrl} alt={item.itemName} className="item-card-image" />
//             <div className="item-card-info">
//                 <h4 className="item-card-title">{item.itemName}</h4>
//                 <p className="item-card-location">{item.location}</p>
//                 <p className="item-card-user">Reported by: {item.user.username}</p>
//                 <span className={`item-card-status ${item.status.toLowerCase()}`}>{item.status}</span>
//             </div>

//             {/* --- NEW: Conditional Claim Button --- */}
//             {canBeClaimed && (
//                 <div className="item-card-actions">
//                     <button onClick={handleClaim} className="cred-btn">
//                         I have this!
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ItemCard;

// src/components/dashboard/ItemCard.js

import React from 'react';
import itemService from '../../services/itemService'; // Import the service

// The card needs to know who the current user is to show/hide the button
const ItemCard = ({ item, currentUser }) => {
    
    const handleClaim = async () => {
        if (!window.confirm("Are you sure you want to claim you have this item? This will notify the owner.")) {
            return;
        }
        try {
            // This now calls the corrected service function
            await itemService.claimItem(item._id);
            alert("Claim successful! The owner has been notified.");
            window.location.reload(); // Reload to see the status change
        } catch (err) {
            // The alert will now show the specific error from the backend
            alert(err.response?.data?.msg || "Failed to claim item.");
        }
    };

    const isOwner = currentUser && item.user && currentUser.id === item.user._id;
    const canBeClaimed = item.status === 'Lost' && !isOwner;

    return (
        <div className="item-card">
            <img src={item.imageUrl} alt={item.itemName} className="item-card-image" />
            <div className="item-card-info">
                <h4 className="item-card-title">{item.itemName}</h4>
                <p className="item-card-location">{item.location}</p>
                <p className="item-card-user">Reported by: {item.user?.username || 'N/A'}</p>
                
                {item.status === 'Claimed' && item.claimedBy && (
                    <p className="item-card-user claimed-by">Claimed by: {item.claimedBy.username}</p>
                )}

                <span className={`item-card-status ${item.status.toLowerCase()}`}>{item.status}</span>
            </div>

            {canBeClaimed && (
                <div className="item-card-actions">
                    <button onClick={handleClaim} className="cred-btn">
                        I have this!
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItemCard;