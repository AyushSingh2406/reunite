// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // --- User Signup Logic ---
// exports.signup = async (req, res) => {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).json({ msg: 'Please enter all fields.' });
//     }

//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ msg: 'User with this email already exists.' });
//         }

//         user = new User({ username, email, password });
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);
//         await user.save();

//         res.status(201).json({ msg: 'Signup successful! Please log in.' });
//     } catch (err) {
//         console.error("Signup Error:", err.message);
//         // CORRECTED: Always send a JSON response, even for server errors.
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // --- User Login Logic ---
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ msg: 'Please enter all fields.' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         const payload = {
//             user: { id: user.id },
//         };
// // In controllers/authController.js

// jwt.sign(
//     payload,
//     'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345', // Use the key from your .env file
//     { expiresIn: '1h' }, // A comma was missing here
//     (err, token) => {
//         if (err) throw err;
//         res.json({
//             token,
//            user: {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         role: user.role // Add this line
//     },
//         });
//     }
// );
//     } catch (err) {
//         console.error("Login Error:", err.message);
//         // CORRECTED: Always send a JSON response, even for server errors.
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };



// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // --- User Signup Logic (existing code) ---
// exports.signup = async (req, res) => {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).json({ msg: 'Please enter all fields.' });
//     }

//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ msg: 'User with this email already exists.' });
//         }

//         user = new User({ username, email, password });
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);
//         await user.save();

//         res.status(201).json({ msg: 'Signup successful! Please log in.' });
//     } catch (err) {
//         console.error("Signup Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // --- User Login Logic (existing code) ---
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ msg: 'Please enter all fields.' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }

//         const payload = {
//             user: { id: user.id },
//         };

//         jwt.sign(
//             payload,
//             'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345',
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         username: user.username,
//                         email: user.email,
//                         role: user.role
//                     },
//                 });
//             }
//         );
//     } catch (err) {
//         console.error("Login Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // --- NEW: User Profile Update Logic ---
// exports.updateProfile = async (req, res) => {
//     // req.user.id comes from the authMiddleware
//     const userId = req.user.id;
//     const { username, email, password } = req.body;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found.' });
//         }

//         // Update username and email if provided
//         if (username) user.username = username;
//         if (email) user.email = email;

//         // If a new password is provided, hash it and update
//         if (password) {
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt);
//         }

//         await user.save();

//         // Send back the updated user details (excluding password)
//         const updatedUser = {
//             id: user.id,
//             username: user.username,
//             email: user.email,
//             role: user.role,
//         };

//         res.json({ user: updatedUser, msg: 'Profile updated successfully!' });

//     } catch (err) {
//         console.error("Update Profile Error:", err);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };




const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- User Signup Logic (no changes needed) ---
exports.signup = async (req, res) => {
    // ... your existing signup code
};

// --- User Login Logic (updated to return new fields) ---
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                // This now includes collegeId and address in the login response
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        collegeId: user.collegeId,
                        address: user.address,
                    },
                });
            }
        );
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- User Profile Update Logic (updated to handle and return new fields) ---
exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { username, email, collegeId, address } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (collegeId) user.collegeId = collegeId;
        if (address) user.address = address;

        await user.save();

        // This now includes collegeId and address in the update response
        const updatedUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            collegeId: user.collegeId,
            address: user.address,
        };

        res.json({ user: updatedUser, msg: 'Profile updated successfully!' });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};
