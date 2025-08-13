// import React, { useState } from 'react';

// const FoundItemForm = ({ handleClose, onReportSubmitted }) => {
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

// export default FoundItemForm;


// FoundItemForm.js
// import React, { useState } from 'react';
// import itemService from '../../services/itemService'; // Import the service

// const FoundItemForm = ({ handleClose, onReportSubmitted }) => {
//     const [formData, setFormData] = useState({
//         itemName: '',
//         description: '',
//         location: '',
//         category: '',
//     });
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const { itemName, description, location, category } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!category) {
//             setError('Please enter a category for the item.');
//             return;
//         }

//         setIsSubmitting(true);
//         setError('');

//         try {
//             // Use the itemService, which handles the token automatically
//             await itemService.createItem({ ...formData, status: 'Found' });
            
//             alert('Report submitted successfully!');
//             if (onReportSubmitted) onReportSubmitted();
//             if (handleClose) handleClose();

//         } catch (err) {
//             // The service returns a consistent error object
//             setError(err.response?.data?.msg || 'Failed to submit report.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <form className="item-form" onSubmit={handleSubmit}>
//             {error && <p className="auth-error">{error}</p>}
//             {/* Your form inputs remain the same */}
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

// export default FoundItemForm;


import React, { useState } from 'react';
import itemService from '../../services/itemService'; // Import the service

const FoundItemForm = ({ handleClose, onReportSubmitted }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        location: '',
        category: '',
    });
    // State to hold the selected image file
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { itemName, description, location, category } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    // Handler to update the image file state
    const onFileChange = e => setImageFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Make the photo upload mandatory
        if (!imageFile) {
            setError('Please upload a photo of the item.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Use FormData to send both text and file data
            const data = new FormData();
            data.append('itemName', itemName);
            data.append('description', description);
            data.append('location', location);
            data.append('category', category);
            data.append('status', 'Found');
            data.append('image', imageFile); // The key 'image' must match the backend

            await itemService.createItem(data);
            
            alert('Report submitted successfully!');
            if (onReportSubmitted) onReportSubmitted();
            if (handleClose) handleClose();

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
                <input type="text" placeholder="What did you find?" className="auth-input" name="itemName" value={itemName} onChange={onChange} required />
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Where did you find it?" className="auth-input" name="location" value={location} onChange={onChange} required />
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter a category (e.g., Books)" className="auth-input" name="category" value={category} onChange={onChange} required />
            </div>
            <div className="input-wrapper">
                <textarea placeholder="Describe the item..." className="auth-input textarea" rows="3" name="description" value={description} onChange={onChange} required></textarea>
            </div>
            
            {/* Functional File Input */}
            <div className="input-wrapper">
                <label htmlFor="file-upload" className="upload-btn">
                    {imageFile ? imageFile.name : 'Upload a Photo'}
                </label>
                <input 
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    required
                    style={{ display: 'none' }}
                />
            </div>
            
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Post Found Item'}
            </button>
        </form>
    );
};

export default FoundItemForm;