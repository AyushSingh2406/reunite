// // routes/items.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authMiddleware'); // Import the auth middleware

// // Import the controller functions
// const { addItem, getAllItems, getMatchedItems, claimItem, resolveItem } = require('../controllers/itemController');

// // @route   POST api/items
// // @desc    Add a new lost or found item
// // @access  Private (requires token)
// router.post('/', auth, addItem);
// router.post('/:id/claim', auth, claimItem);
// router.post('/:id/resolve', auth, resolveItem);
// // @route   GET api/items
// // @desc    Get all items
// // @access  Public
// router.get('/', getAllItems);

// module.exports = router;


// // backend/routes/items.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authMiddleware');

// // --- THIS IS THE CORRECTED LINE ---
// // We've added 'resolveItem' to the list of imported functions.
// const { addItem, getAllItems, claimItem, resolveItem } = require('../controllers/itemController');
// router.post('/', auth, upload.single('image'), addItem);
// // @route   POST api/items
// // @desc    Add a new lost or found item
// // @access  Private
// router.post('/', auth, addItem);

// // @route   GET api/tools
// // @desc    Get all items
// // @access  Public
// router.get('/', getAllItems);

// // @route   POST api/items/:id/claim
// // @desc    Claim a lost item
// // @access  Private
// router.post('/:id/claim', auth, claimItem);

// // @route   POST api/items/:id/resolve
// // @desc    Mark an item as resolved
// // @access  Private
// router.post('/:id/resolve', auth, resolveItem);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authMiddleware');
// const { addItem, getAllItems, claimItem, resolveItem } = require('../controllers/itemController');

// // This line imports the upload middleware, which fixes the error.
// const upload = require('../middleware/uploadMiddleware');

// // This line uses the imported 'upload' middleware.
// router.post('/', auth, upload.single('image'), addItem);

// // Other routes
// router.get('/', getAllItems);
// router.post('/:id/claim', auth, claimItem);
// router.post('/:id/resolve', auth, resolveItem);

// module.exports = router;// (Removed commented duplicate block)


const express = require('express');
const router = express.Router();

// Import middleware and controllers
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { 
    addItem, 
    getAllItems, 
    claimItem, 
    resolveItem 
} = require('../controllers/itemController');

// Define the route for creating a new item with an image upload
// Path: POST /api/items/
router.post('/', auth, upload.single('image'), addItem);

// Define the route for getting all non-resolved items
// Path: GET /api/items/
router.get('/', getAllItems);

// Define the route for claiming an item
// Path: POST /api/items/:id/claim
router.post('/:id/claim', auth, claimItem);

// Define the route for resolving a claimed item
// Path: POST /api/items/:id/resolve
router.post('/:id/resolve', auth, resolveItem);

module.exports = router;