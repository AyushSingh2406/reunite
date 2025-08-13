// middleware/adminMiddleware.js

const User = require('../models/User');

module.exports = async function(req, res, next) {
    try {
        // req.user.id comes from the standard authMiddleware
        const user = await User.findById(req.user.id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Not an admin.' });
        }
        
        next(); // User is an admin, proceed to the route
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};