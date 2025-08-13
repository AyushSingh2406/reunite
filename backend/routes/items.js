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


const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addItem, getAllItems, claimItem, resolveItem } = require('../controllers/itemController');

// This line imports the upload middleware, which fixes the error.
const upload = require('../middleware/uploadMiddleware');

// This line uses the imported 'upload' middleware.
router.post('/', auth, upload.single('image'), addItem);

// Other routes
router.get('/', getAllItems);
router.post('/:id/claim', auth, claimItem);
router.post('/:id/resolve', auth, resolveItem);

module.exports = router;// (Removed commented duplicate block)