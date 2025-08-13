// import React, { useState } from 'react';

// const LostItemForm = ({ handleClose }) => { // Assuming a close handler is passed
//     const [formData, setFormData] = useState({
//         itemName: '',
//         description: '',
//         location: '',
//     });
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const { itemName, description, location } = formData;

//     const API_URL = 'http://localhost:5000/api/items';

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setError('');

//         const token = localStorage.getItem('token');
//         if (!token) {
//             setError('You must be logged in to submit a report.');
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const response = await fetch(API_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-auth-token': token, // Send the token for protected routes
//                 },
//                 body: JSON.stringify({ ...formData, status: 'Lost' }), // Add the status
//             });

//             if (!response.ok) {
//                 const errData = await response.json();
//                 throw new Error(errData.msg || 'Failed to submit report.');
//             }

//             // If successful, you can close the modal or show a success message
//             alert('Report submitted successfully!');
//             if (handleClose) handleClose();

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <form className="item-form" onSubmit={handleSubmit}>
//             {error && <p className="auth-error">{error}</p>}
//             <div className="input-wrapper">
//                 <input 
//                     type="text" 
//                     placeholder="What did you lose?" 
//                     className="auth-input" 
//                     name="itemName"
//                     value={itemName}
//                     onChange={onChange}
//                     required 
//                 />
//             </div>
//             <div className="input-wrapper">
//                 <input 
//                     type="text" 
//                     placeholder="Where did you last see it?" 
//                     className="auth-input" 
//                     name="location"
//                     value={location}
//                     onChange={onChange}
//                     required 
//                 />
//             </div>
//             <div className="input-wrapper">
//                 <textarea 
//                     placeholder="Describe the item..." 
//                     className="auth-input textarea" 
//                     rows="3" 
//                     name="description"
//                     value={description}
//                     onChange={onChange}
//                     required
//                 ></textarea>
//             </div>
//             <button type="button" className="upload-btn">Upload a Photo</button>
//             <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
//                 {isSubmitting ? 'Submitting...' : 'Submit Report'}
//             </button>
//         </form>
//     );
// };

// export default LostItemForm;



// import React, { useState } from 'react';

// const LostItemForm = ({ handleClose, onReportSubmitted }) => {
//     const [formData, setFormData] = useState({
//         itemName: '',
//         description: '',
//         location: '',
//         category: '', // Category field is kept for functionality
//     });
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const { itemName, description, location, category } = formData;

//     const API_URL = 'http://localhost:5000/api/items';

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!category) {
//             setError('Please enter a category for the item.');
//             return;
//         }

//         setIsSubmitting(true);
//         setError('');

//         const token = localStorage.getItem('token');
//         if (!token) {
//             setError('You must be logged in to submit a report.');
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const response = await fetch(API_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-auth-token': token, // Send the token for protected routes
//                 },
//                 body: JSON.stringify({ ...formData, status: 'Found' }), // Add the status
//             });

//             if (!response.ok) {
//                 const errData = await response.json();
//                 throw new Error(errData.msg || 'Failed to submit report.');
//             }

//             alert('Report submitted successfully!');
//             if (onReportSubmitted) onReportSubmitted(); // Trigger dashboard refresh
//             if (handleClose) handleClose();

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <form className="item-form" onSubmit={handleSubmit}>
//             {error && <p className="auth-error">{error}</p>}
//             <div className="input-wrapper">
//                 <input type="text" placeholder="What did you find?" className="auth-input" name="itemName" value={itemName} onChange={onChange} required />
//             </div>
//             <div className="input-wrapper">
//                 <input type="text" placeholder="Where did you find it?" className="auth-input" name="location" value={location} onChange={onChange} required />
//             </div>
//             <div className="input-wrapper">
//                 <input type="text" placeholder="Enter a category (e.g., Books)" className="auth-input" name="category" value={category} onChange={onChange} required />
//             </div>
//             <div className="input-wrapper">
//                 <textarea placeholder="Describe the item..." className="auth-input textarea" rows="3" name="description" value={description} onChange={onChange} required></textarea>
//             </div>
//             <button type="button" className="upload-btn">Upload a Photo</button>
//             <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
//                 {isSubmitting ? 'Submitting...' : 'Post Found Item'}
//             </button>
//         </form>
//     );
// };

// export default LostItemForm;



// import React, { useState } from 'react';
// import itemService from '../../services/itemService'; // Adjust path if needed

// const LostItemForm = ({ handleClose, onReportSubmitted }) => {
//     const [formData, setFormData] = useState({
//         itemName: '',
//         description: '',
//         location: '',
//         category: '', // ADDED: Category field to the form's state
//     });
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const { itemName, description, location, category } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Added a check to ensure category is not empty
//         if (!category) {
//             setError('Please enter a category for the item.');
//             return;
//         }

//         setIsSubmitting(true);
//         setError('');

//         try {
//             // The complete formData (including category) is now sent
//             await itemService.addItem({ ...formData, status: 'Lost' });
//             alert('Report submitted successfully!');
//             onReportSubmitted(); // This will trigger the dashboard refresh
//             handleClose();
//         } catch (err) {
//             setError(err.response?.data?.msg || 'Failed to submit report.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <form className="item-form" onSubmit={handleSubmit}>
//             {error && <p className="auth-error">{error}</p>}
//             <div className="input-wrapper">
//                 <input 
//                     type="text" 
//                     placeholder="What did you lose?" 
//                     className="auth-input" 
//                     name="itemName"
//                     value={itemName}
//                     onChange={onChange}
//                     required 
//                 />
//             </div>
//             <div className="input-wrapper">
//                 <input 
//                     type="text" 
//                     placeholder="Where did you last see it?" 
//                     className="auth-input" 
//                     name="location"
//                     value={location}
//                     onChange={onChange}
//                     required 
//                 />
//             </div>
//             {/* ADDED: Input field for the category */}
//             <div className="input-wrapper">
//                 <input 
//                     type="text" 
//                     placeholder="Enter a category (e.g., Electronics)" 
//                     className="auth-input" 
//                     name="category"
//                     value={category}
//                     onChange={onChange}
//                     required 
//                 />
//             </div>
//             <div className="input-wrapper">
//                 <textarea 
//                     placeholder="Describe the item..." 
//                     className="auth-input textarea" 
//                     rows="3" 
//                     name="description"
//                     value={description}
//                     onChange={onChange}
//                     required
//                 ></textarea>
//             </div>
//             <button type="button" className="upload-btn">Upload a Photo</button>
//             <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
//                 {isSubmitting ? 'Submitting...' : 'Submit Report'}
//             </button>
//         </form>
//     );
// };

// export default LostItemForm;


// src/components/dashboard/LostItemForm.js

import React, { useState } from 'react';
import itemService from '../../services/itemService'; // 1. Using the service for cleaner code

const LostItemForm = ({ handleClose, onReportSubmitted }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        location: '',
        category: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { itemName, description, location, category } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!category) {
            setError('Please enter a category for the item.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // 2. This sends the correct POST request to create the item.
            await itemService.createItem({ ...formData, status: 'Lost' });
            
            alert('Report submitted successfully!');

            // 3. This tells App.js that the submission was successful.
            onReportSubmitted(); 
            
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to submit report.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            {error && <p className="auth-error">{error}</p>}
            <div className="input-wrapper">
                <input 
                    type="text" 
                    placeholder="What did you lose?" 
                    className="auth-input" 
                    name="itemName"
                    value={itemName}
                    onChange={onChange}
                    required 
                />
            </div>
            <div className="input-wrapper">
                <input 
                    type="text" 
                    placeholder="Where did you last see it?" 
                    className="auth-input" 
                    name="location"
                    value={location}
                    onChange={onChange}
                    required 
                />
            </div>
            <div className="input-wrapper">
                <input 
                    type="text" 
                    placeholder="Enter a category (e.g., Electronics)" 
                    className="auth-input" 
                    name="category"
                    value={category}
                    onChange={onChange}
                    required 
                />
            </div>
            <div className="input-wrapper">
                <textarea 
                    placeholder="Describe the item..." 
                    className="auth-input textarea" 
                    rows="3" 
                    name="description"
                    value={description}
                    onChange={onChange}
                    required
                ></textarea>
            </div>
            <button type="button" className="upload-btn">Upload a Photo</button>
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
        </form>
    );
};

export default LostItemForm;
