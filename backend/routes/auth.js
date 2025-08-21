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
const { signup, login, updateProfile } = require('../controllers/authController');

// --- Email & Password Routes ---
router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', auth, updateProfile);

// --- Google OAuth Routes ---

// @desc    Auth with Google
// @route   GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // On successful authentication, Passport attaches the user to req.user
    const payload = { user: { id: req.user.id } };
    
    jwt.sign(
        payload,
        'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345', // Use your JWT secret
        { expiresIn: '1h' },
        (err, token) => {
            if (err) throw err;
            // Redirect to your live frontend URL with the token
            // Replace with your actual Netlify URL
            res.redirect(`https://reunite-lnds.netlify.app/?token=${token}`);
        }
    );
});

module.exports = router;
