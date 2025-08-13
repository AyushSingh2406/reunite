// src/services/adminService.js

import api from './api'; // Import the main api with the auth interceptor

const getAllUsers = () => {
    return api.get('/admin/users');
};

const deleteUser = (id) => {
    return api.delete(`/admin/users/${id}`);
};

const deleteItem = (id) => {
    return api.delete(`/admin/items/${id}`);
};

const adminService = {
    getAllUsers,
    deleteUser,
    deleteItem,
};

export default adminService;