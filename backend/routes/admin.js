// // routes/admin.js
// const express = require('express');
// const router = express.Router();

// const auth = require('../middleware/authMiddleware');
// const admin = require('../middleware/adminMiddleware');

// const { getAllUsers, deleteUser, deleteItem } = require('../controllers/adminController');

// // All routes in this file are protected by auth and admin middleware
// router.get('/users', [auth, admin], getAllUsers);
// router.delete('/users/:id', [auth, admin], deleteUser);
// router.delete('/items/:id', [auth, admin], deleteItem);

// module.exports = router;
// routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// Import the new function from the controller
const { 
    getAllUsers, 
    deleteUser, 
    deleteItem, 
    getAllItemsAdmin 
} = require('../controllers/adminController');

// NEW: Route for admins to get all items
router.get('/items', [auth, admin], getAllItemsAdmin);

// --- Existing Routes ---
router.get('/users', [auth, admin], getAllUsers);
router.delete('/users/:id', [auth, admin], deleteUser);
router.delete('/items/:id', [auth, admin], deleteItem);

module.exports = router;