// const express = require('express');
// const router = express.Router();

// // Import the controller functions
// const { signup, login } = require('../controllers/authController');

// // Define the routes and connect them to the controller functions
// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { signup, login } = require('../controllers/authController');

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// This line now correctly imports all three functions
const { signup, login, updateProfile } = require('../controllers/authController');

// Existing routes
router.post('/signup', signup);
router.post('/login', login);

// NEW: Route for updating user profile (protected by auth middleware)
router.put('/profile', auth, updateProfile);

module.exports = router;
