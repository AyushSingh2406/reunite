// const express = require('express');
// const router = express.Router();

// // Import the controller functions
// const { signup, login } = require('../controllers/authController');

// // Define the routes and connect them to the controller functions
// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;



const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

module.exports = router;