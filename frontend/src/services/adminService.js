// // src/services/adminService.js

// import api from './api'; // Import the main api with the auth interceptor

// const getAllUsers = () => {
//     return api.get('/admin/users');
// };

// const deleteUser = (id) => {
//     return api.delete(`/admin/users/${id}`);
// };

// const deleteItem = (id) => {
//     return api.delete(`/admin/items/${id}`);
// };
// const getAllItems = () => {
//     return api.get('/admin/items');
// };

// const adminService = {
//     getAllUsers,
//     deleteUser,
//     deleteItem,
//     getAllItems,
// };

// export default adminService;

import api from './api';

const getAllUsers = () => {
    return api.get('/admin/users');
};

const deleteUser = (id) => {
    return api.delete(`/admin/users/${id}`);
};

const deleteItem = (id) => {
    return api.delete(`/admin/items/${id}`);
};

// NEW: Function to call the new backend route
const getAllItems = () => {
    return api.get('/admin/items');
};

const adminService = {
    getAllUsers,
    deleteUser,
    deleteItem,
    getAllItems, // Export the new function
};

export default adminService;