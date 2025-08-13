// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
//     // Get token from the header
//     const token = req.header('x-auth-token');

//     // Check if not token
//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     // Verify token
//    // In middleware/authMiddleware.js

// try {
//     // Temporarily use the hardcoded secret to match the controller
//     const decoded = jwt.verify(token, 'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345');
//     req.user = decoded.user;
//     next();
// } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
// }
// };
// In middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    // --- ADD THESE TWO LINES FOR DEBUGGING ---
    console.log('--- AUTH MIDDLEWARE CHECK ---');
    console.log('Token Received on Backend:', token);
    // -----------------------------------------

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Make sure this secret is IDENTICAL to the one in authController.js
        const decoded = jwt.verify(token, 'THIS_IS_A_VERY_LONG_AND_SECRET_KEY_FOR_MY_APP_12345');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};