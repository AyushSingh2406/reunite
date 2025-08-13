const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- User Signup Logic ---
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists.' });
        }

        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.status(201).json({ msg: 'Signup successful! Please log in.' });
    } catch (err) {
        console.error("Signup Error:", err.message);
        // CORRECTED: Always send a JSON response, even for server errors.
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- User Login Logic ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: { id: user.id },
        };
// In controllers/authController.js

jwt.sign(
    payload,
    'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345', // Use the key from your .env file
    { expiresIn: '1h' }, // A comma was missing here
    (err, token) => {
        if (err) throw err;
        res.json({
            token,
           user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role // Add this line
    },
        });
    }
);
    } catch (err) {
        console.error("Login Error:", err.message);
        // CORRECTED: Always send a JSON response, even for server errors.
        res.status(500).json({ msg: 'Server Error' });
    }
};
