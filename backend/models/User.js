// const mongoose = require('mongoose');

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
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user'
//     },
//     // --- NEW FIELDS ---
//     collegeId: {
//         type: String,
//         trim: true,
//         default: 'Not Set'
//     },
//     address: {
//         type: String,
//         trim: true,
//         default: 'Not Set'
//     }
// }, { 
//     timestamps: true 
// });

// const User = mongoose.model('User', UserSchema);

// module.exports = User;


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    username: { 
        type: String, 
        required: true, 
        trim: true 
        // We remove 'unique' because multiple Google users might have the same display name.
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
        // Password is not required if the user signs up with Google
        required: function() { return !this.googleId; } 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
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
