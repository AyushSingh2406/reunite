// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // --- User Signup Logic (no changes needed) ---
// exports.signup = async (req, res) => {
//     // ... your existing signup code
// };

// // --- User Login Logic (updated to return new fields) ---
// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid credentials' });
//         }
//         const payload = { user: { id: user.id } };
//         jwt.sign(
//             payload,
//             'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345',
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) throw err;
//                 // This now includes collegeId and address in the login response
//                 res.json({
//                     token,
//                     user: {
//                         id: user.id,
//                         username: user.username,
//                         email: user.email,
//                         role: user.role,
//                         collegeId: user.collegeId,
//                         address: user.address,
//                     },
//                 });
//             }
//         );
//     } catch (err) {
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // --- User Profile Update Logic (updated to handle and return new fields) ---
// exports.updateProfile = async (req, res) => {
//     const userId = req.user.id;
//     const { username, email, collegeId, address } = req.body;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found.' });
//         }

//         if (username) user.username = username;
//         if (email) user.email = email;
//         if (collegeId) user.collegeId = collegeId;
//         if (address) user.address = address;

//         await user.save();

//         // This now includes collegeId and address in the update response
//         const updatedUser = {
//             id: user.id,
//             username: user.username,
//             email: user.email,
//             role: user.role,
//             collegeId: user.collegeId,
//             address: user.address,
//         };

//         res.json({ user: updatedUser, msg: 'Profile updated successfully!' });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };




const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/email');

// --- User Signup with Email Verification ---
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists.' });
        }

        user = new User({ username, email, password });
        user.password = await bcrypt.hash(password, 10);
        
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.verificationToken = verificationToken;

        await user.save();

        // Send verification email
        const verificationURL = `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/verify/${verificationToken}`;
        const message = `<p>Please verify your email by clicking this link: <a href="${verificationURL}">Verify Email</a></p>`;

        await sendEmail({
            email: user.email,
            subject: 'Reunite Account: Email Verification',
            html: message,
        });

        res.status(201).json({ msg: 'Signup successful! Please check your email to verify your account.' });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- Verify Email Handler (with Auto-Login) ---
exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (!user) {
            return res.status(400).send('<h1>Error</h1><p>Verification token is invalid or has already been used.</p>');
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        
        // Automatically log the user in by generating a token and redirecting
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, 'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345', { expiresIn: '1h' });

        // Redirect to the frontend with the token
        res.redirect(`https://reunitelnds.netlify.app/?token=${token}`);

    } catch (err) {
        console.error("Verify Email Error:", err);
        res.status(500).send('<h1>Error</h1><p>An error occurred during verification. Please try again later.</p>');
    }
};

// --- User Login (Checks if verified) ---
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ msg: 'Please verify your email before logging in.' });
        }

        if (!user.password) {
            return res.status(400).json({ msg: 'Please log in using the method you originally signed up with (e.g., Google).' });
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
        console.error("Login Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- Get Current User Data ---
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error("Get Me Error:", err);
        res.status(500).send('Server Error');
    }
};

// --- User Profile Update Logic ---
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
        console.error("Update Profile Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- Forgot Password ---
exports.forgotPassword = async (req, res) => {
    try {
        // THIS IS THE FIX: We now correctly use req.body.email to get the string.
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // We send a generic success message even if the user doesn't exist
            // to prevent attackers from checking which emails are registered.
            return res.status(200).json({ msg: 'If a user with that email exists, an OTP has been sent.' });
        }

        const resetToken = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6-character OTP
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await sendEmail({
            email: user.email,
            subject: 'Your Password Reset OTP',
            html: `<p>Your password reset OTP is: <strong>${resetToken}</strong>. It is valid for 10 minutes.</p>`,
        });
        res.status(200).json({ msg: 'OTP sent to email!' });
    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- Reset Password ---
exports.resetPassword = async (req, res) => {
    const { email, token, password } = req.body;
    try {
        const user = await User.findOne({
            email,
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: 'Token is invalid or has expired.' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        
        res.status(200).json({ msg: 'Password reset successful! You can now log in.' });
    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
