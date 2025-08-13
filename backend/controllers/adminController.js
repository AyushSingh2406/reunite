
// const cloudinary = require('cloudinary').v2;
// const User = require('../models/User');
// const Item = require('../models/Item');

// // @desc    Get all users
// // @route   GET /api/admin/users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password'); // Exclude passwords
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // @desc    Delete a user
// // @route   DELETE /api/admin/users/:id
// exports.deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ msg: 'User removed' });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // @desc    Delete an item/report and its associated image from Cloudinary
// // @route   DELETE /api/admin/items/:id
// exports.deleteItem = async (req, res) => {
//     try {
//         // 1. Find the item in the database to get its details
//         const item = await Item.findById(req.params.id);

//         if (!item) {
//             return res.status(404).json({ msg: 'Item not found.' });
//         }

//         // 2. If an image URL exists, delete the image from Cloudinary
//         if (item.imageUrl) {
//             // Extract the public_id from the full Cloudinary URL
//             // The public_id includes the folder name (e.g., "reunite-app/some-file-name")
//             const publicId = item.imageUrl.split('/').slice(-2).join('/').split('.')[0];
            
//             // Send the command to Cloudinary to destroy the image
//             await cloudinary.uploader.destroy(publicId);
//         }

//         // 3. Finally, delete the item record from the database
//         await Item.findByIdAndDelete(req.params.id);

//         res.json({ msg: 'Item and associated image removed successfully.' });
//     } catch (err) {
//         console.error("Delete Item Error:", err);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };


// controllers/adminController.js

// const cloudinary = require('cloudinary').v2;
// const User = require('../models/User');
// const Item = require('../models/Item');

// // @desc    Get all items for the admin dashboard (includes resolved)
// // @route   GET /api/admin/items
// exports.getAllItemsAdmin = async (req, res) => {
//     try {
//         // Find all items with no status filter
//         const items = await Item.find({})
//             .sort({ createdAt: -1 })
//             .populate('user', '_id username email')
//             .populate('claimedBy', '_id username email');
//         res.json(items);
//     } catch (err) {
//         console.error("Admin Get All Items Error:", err);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // @desc    Get all users
// // @route   GET /api/admin/users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password'); // Exclude passwords
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // @desc    Delete a user
// // @route   DELETE /api/admin/users/:id
// exports.deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ msg: 'User removed' });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // @desc    Delete an item/report and its associated image from Cloudinary
// // @route   DELETE /api/admin/items/:id
// exports.deleteItem = async (req, res) => {
//     try {
//         // 1. Find the item in the database to get its details
//         const item = await Item.findById(req.params.id);

//         if (!item) {
//             return res.status(404).json({ msg: 'Item not found.' });
//         }

//         // 2. If an image URL exists, delete the image from Cloudinary
//         if (item.imageUrl) {
//             // Extract the public_id from the full Cloudinary URL
//             const publicId = item.imageUrl.split('/').slice(-2).join('/').split('.')[0];
            
//             // Send the command to Cloudinary to destroy the image
//             await cloudinary.uploader.destroy(publicId);
//         }

//         // 3. Finally, delete the item record from the database
//         await Item.findByIdAndDelete(req.params.id);

//         res.json({ msg: 'Item and associated image removed successfully.' });
//     } catch (err) {
//         console.error("Delete Item Error:", err);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };


const cloudinary = require('cloudinary').v2;
const User = require('../models/User');
const Item = require('../models/Item');

// NEW: Function to get ALL items for the admin view
exports.getAllItemsAdmin = async (req, res) => {
    try {
        // Find all items with no status filter
        const items = await Item.find({})
            .sort({ createdAt: -1 })
            .populate('user', '_id username email')
            .populate('claimedBy', '_id username email');
        res.json(items);
    } catch (err) {
        console.error("Admin Get All Items Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- Existing Functions ---

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found.' });
        }
        if (item.imageUrl) {
            const publicId = item.imageUrl.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }
        await Item.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Item and associated image removed successfully.' });
    } catch (err) {
        console.error("Delete Item Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
};