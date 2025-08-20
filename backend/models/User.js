// const mongoose = require('mongoose');

// // This defines the structure for user documents in your database
// const UserSchema = new mongoose.Schema({
//     username: { 
//         type: String, 
//         required: true, 
//         unique: true, 
//         trim: true 
//     },
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true, 
//         trim: true, 
//         lowercase: true 
//     },
//     password: { 
//         type: String, 
//         required: true 
//     },
//       role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user'
//     }
// }, { 
//     timestamps: true // Adds createdAt and updatedAt timestamps automatically
// });

// // The 'User' string is the name of the collection that will be created in the database
// const User = mongoose.model('User', UserSchema);

// module.exports = User;

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // --- NEW FIELDS ---
    collegeId: {
        type: String,
        trim: true,
        default: 'Not Set'
    },
    address: {
        type: String,
        trim: true,
        default: 'Not Set'
    }
}, { 
    timestamps: true 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
