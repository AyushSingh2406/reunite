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



// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authMiddleware');

// // This line now correctly imports all three functions
// const { signup, login, updateProfile } = require('../controllers/authController');

// // Existing routes
// router.post('/signup', signup);
// router.post('/login', login);

// // NEW: Route for updating user profile (protected by auth middleware)
// router.put('/profile', auth, updateProfile);

// module.exports = router;


const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User'); // Import the User model
const { signup, login, updateProfile } = require('../controllers/authController');

// --- Email & Password Routes ---
router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', auth, updateProfile);

// --- NEW: Route to get user data from a token ---
// @route   GET /api/auth/me
// @desc    Get current user data
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // req.user.id is attached by the authMiddleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- Google OAuth Routes ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const payload = { user: { id: req.user.id } };
    jwt.sign(
        payload,
        'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345',
        { expiresIn: '1h' },
        (err, token) => {
            if (err) throw err;
            res.redirect(`https://reunitelnds.netlify.app/?token=${token}`);
        }
    );
});

module.exports = router;


