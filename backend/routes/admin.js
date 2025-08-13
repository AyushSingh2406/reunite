// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authMiddleware');
// const admin = require('../middleware/adminMiddleware');

// // Import the new function from the controller
// const { 
//     getAllUsers, 
//     deleteUser, 
//     deleteItem, 
//     getAllItemsAdmin 
// } = require('../controllers/adminController');

// // NEW: Route for admins to get all items
// router.get('/items', [auth, admin], getAllItemsAdmin);

// // --- Existing Routes ---
// router.get('/users', [auth, admin], getAllUsers);
// router.delete('/users/:id', [auth, admin], deleteUser);
// router.delete('/items/:id', [auth, admin], deleteItem);

// module.exports = router;



const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { 
    getAllUsers, 
    deleteUser, 
    deleteItem, 
    getAllItemsAdmin 
} = require('../controllers/adminController');

// GET /api/admin/items
router.get('/items', [auth, admin], getAllItemsAdmin);

// GET /api/admin/users
router.get('/users', [auth, admin], getAllUsers);

// DELETE /api/admin/users/:id
router.delete('/users/:id', [auth, admin], deleteUser);

// DELETE /api/admin/items/:id
router.delete('/items/:id', [auth, admin], deleteItem);

module.exports = router;