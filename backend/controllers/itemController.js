// const Item = require('../models/Item');

// // @desc    Get all items
// // @route   GET /api/items
// exports.getAllItems = async (req, res) => {
//     try {
//         const items = await Item.find().sort({ createdAt: -1 }); // Get newest items first
//         res.json(items);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };

// // @desc    Create a new item
// // @route   POST /api/items
// exports.createItem = async (req, res) => {
//     const { name, status, location, category, description } = req.body;

//     // Basic validation
//     if (!name || !status || !location || !category || !description) {
//         return res.status(400).json({ msg: 'Please fill out all required fields.' });
//     }

//     try {
//         const newItem = new Item({
//             name,
//             status,
//             location,
//             category,
//             description,
//             user: req.user.id // Get the user ID from the auth middleware
//         });

//         const item = await newItem.save();
//         res.status(201).json(item);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };

// // controllers/itemController.js
// const Item = require('../models/Item');

// // In controllers/itemController.js

// // --- Claim a Lost Item ---
// exports.claimItem = async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);

//         // Check if the item exists and is still 'Lost'
//         if (!item || item.status !== 'Lost') {
//             return res.status(404).json({ msg: 'Item not available for claim.' });
//         }

//         // Check that a user isn't claiming their own item
//         if (item.user.toString() === req.user.id) {
//             return res.status(400).json({ msg: 'You cannot claim your own item.' });
//         }

//         // Update the item
//         item.status = 'Claimed';
//         item.claimedBy = req.user.id; // Set the claimer to the current user
//         await item.save();

//         res.json(item);

//     } catch (err) {
//         console.error("Claim Item Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };
// // --- Create a new Lost/Found Item Report ---
// exports.addItem = async (req, res) => {
//     // UPDATED: Added 'category' to be read from the request body
//     const { itemName, description, location, status, imageUrl, category } = req.body;

    

//     // Basic validation to ensure category was sent from the form
//     if (!category) {
//         return res.status(400).json({ msg: 'Category is required.' });
//     }

//     try {
//         const newItem = new Item({
//             itemName,
//             description,
//             location,
//             status,
//             imageUrl,
//             category, // UPDATED: Included category when creating the new item
//             user: req.user.id, // req.user.id comes from the authMiddleware
//         });

//         const item = await newItem.save();
//         res.status(201).json(item);
//     } catch (err) {
//         console.error("Item Add Error:", err.message);
//         // This is the error you are seeing. It's caused by the validation failure.
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // --- Get all Lost/Found Items ---
// // In backend/controllers/itemController.js

// // In backend/controllers/itemController.js

// // --- Resolve a Claimed Item ---
// exports.resolveItem = async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);

//         // Check if item exists
//         if (!item) {
//             return res.status(404).json({ msg: 'Item not found.' });
//         }

//         // SECURITY CHECK: Only the original owner can resolve the item
//         if (!item.user.equals(req.user.id)) {
//             return res.status(403).json({ msg: 'Authorization denied. You are not the owner of this item.' });
//         }

//         // Update the item's status
//         item.status = 'Resolved';
//         item.isResolved = true; // Using the field from our updated schema
        
//         await item.save();
//         res.json({ msg: 'Item has been marked as resolved.', item });

//     } catch (err) {
//         console.error("Resolve Item Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// exports.getAllItems = async (req, res) => {
//     try {
//         // This query now finds all items where the status is NOT 'Resolved'
//         const items = await Item.find({ status: { $ne: 'Resolved' } })
//             .sort({ date: -1 })
//             .populate('user', '_id username email')
//             .populate('claimedBy', '_id username email');

//         res.json(items);
//     } catch (err) {
//         console.error("Get Items Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };



// const Item = require('../models/Item');

// // --- Create a new Lost/Found Item Report ---
// exports.addItem = async (req, res) => {
//     // Text fields are in req.body
//     const { itemName, description, location, status, category } = req.body;

//     // The 'upload' middleware adds the `file` object to the request.
//     // We check if the file exists, which is our mandatory photo validation.
//     if (!req.file) {
//         return res.status(400).json({ msg: 'An image file is required.' });
//     }

//     try {
//         const newItem = new Item({
//             itemName,
//             description,
//             location,
//             status,
//             category,
//             // Get the secure URL from the file object provided by the Cloudinary middleware
//             imageUrl: req.file.path, 
//             user: req.user.id, // req.user.id comes from the authMiddleware
//         });

//         const item = await newItem.save();
//         res.status(201).json(item);
//     } catch (err) {
//         console.error("Item Add Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // --- Get all non-resolved items ---
// exports.getAllItems = async (req, res) => {
//     try {
//         // Find all items where the status is NOT 'Resolved'
//         const items = await Item.find({ status: { $ne: 'Resolved' } })
//             // Sort by the 'createdAt' field from timestamps to show newest first
//             .sort({ createdAt: -1 }) 
//             .populate('user', '_id username email')
//             .populate('claimedBy', '_id username email');

//         res.json(items);
//     } catch (err) {
//         console.error("Get Items Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };


// // --- Claim a Lost Item (No changes needed) ---
// exports.claimItem = async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);

//         if (!item || item.status !== 'Lost') {
//             return res.status(404).json({ msg: 'Item not available for claim.' });
//         }

//         if (item.user.toString() === req.user.id) {
//             return res.status(400).json({ msg: 'You cannot claim your own item.' });
//         }

//         item.status = 'Claimed';
//         item.claimedBy = req.user.id;
//         await item.save();

//         res.json(item);

//     } catch (err) {
//         console.error("Claim Item Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };

// // --- Resolve a Claimed Item ---
// exports.resolveItem = async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);

//         if (!item) {
//             return res.status(404).json({ msg: 'Item not found.' });
//         }

//         // Security check: Only the original owner can resolve the item
//         if (!item.user.equals(req.user.id)) {
//             return res.status(403).json({ msg: 'Authorization denied. You are not the owner of this item.' });
//         }

//         item.status = 'Resolved';
//         await item.save();
        
//         res.json({ msg: 'Item has been marked as resolved.', item });

//     } catch (err) {
//         console.error("Resolve Item Error:", err.message);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// };




const Item = require('../models/Item');

// --- Create a new Lost/Found Item Report ---
exports.addItem = async (req, res) => {
    console.log("--- addItem Controller Reached ---");
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    try {
        // The 'upload' middleware adds the `file` object to the request.
        if (!req.file) {
            return res.status(400).json({ msg: 'An image file is required.' });
        }

        const { itemName, description, location, status, category } = req.body;

        const newItem = new Item({
            itemName,
            description,
            location,
            status,
            category,
            imageUrl: req.file.path, 
            user: req.user.id,
        });

        const item = await newItem.save();
        res.status(201).json(item);

    } catch (err) {
        // This will print a detailed error to your backend terminal
        console.error("--- FULL ADD ITEM ERROR ---");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        console.error("Full Error Object:", err);
        
        res.status(500).json({ msg: 'Server Error. Check the logs for details.' });
    }
};

// --- Get all non-resolved items ---
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({ status: { $ne: 'Resolved' } })
            .sort({ createdAt: -1 }) 
            .populate('user', '_id username email')
            .populate('claimedBy', '_id username email');
        res.json(items);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- Claim a Lost Item ---
exports.claimItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item || item.status !== 'Lost') {
            return res.status(404).json({ msg: 'Item not available for claim.' });
        }
        if (item.user.toString() === req.user.id) {
            return res.status(400).json({ msg: 'You cannot claim your own item.' });
        }
        item.status = 'Claimed';
        item.claimedBy = req.user.id;
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// --- Resolve a Claimed Item ---
exports.resolveItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found.' });
        }
        if (!item.user.equals(req.user.id)) {
            return res.status(403).json({ msg: 'Authorization denied.' });
        }
        item.status = 'Resolved';
        await item.save();
        res.json({ msg: 'Item has been marked as resolved.', item });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};
