// routes/admin.js
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const { getAllUsers, deleteUser, deleteItem } = require('../controllers/adminController');

// All routes in this file are protected by auth and admin middleware
router.get('/users', [auth, admin], getAllUsers);
router.delete('/users/:id', [auth, admin], deleteUser);
router.delete('/items/:id', [auth, admin], deleteItem);

module.exports = router;