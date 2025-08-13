// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ItemSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User', // This creates a link to the User model
//         required: true
//     },
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     status: {
//         type: String,
//         required: true,
//         enum: ['Lost', 'Found'] // The status can only be one of these two values
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     imageUrl: {
//         type: String,
//         default: 'https://placehold.co/300x200/e2e8f0/334155?text=No+Image'
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('Item', ItemSchema);

// models/Item.js



// const mongoose = require('mongoose');

// const ItemSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Links the item to the user who reported it
//         required: true,
//     },
//     itemName: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ['Lost', 'Found'], // The status can only be 'Lost' or 'Found'
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
//     // Optional: You can add a field for an image URL
//     imageUrl: {
//         type: String,
//     },
// });

// module.exports = mongoose.model('Item', ItemSchema);


// routes/items.js

// const mongoose = require('mongoose');

// const ItemSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     itemName: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     // ADDED: Category field is now part of the model
//     category: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ['Lost', 'Found'],
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
//     imageUrl: {
//         type: String,
//     },
// });

// module.exports = mongoose.model('Item', ItemSchema);


// models/Item.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    // ... description, location, category ...
    status: {
        type: String,
        required: true,
        enum: ['Lost', 'Found', 'Claimed', 'Resolved'] // 'Claimed' & 'Resolved' added
    },
    // ... date, imageUrl ...

    // --- NEW FIELD FOR THE CLAIM SYSTEM ---
    claimedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // The user who claims to have the item
        default: null
    }
}, { timestamps: true });

ItemSchema.index({ status: 1, category: 1, location: 1 });

module.exports = mongoose.model('Item', ItemSchema);