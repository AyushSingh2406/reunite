// require('dotenv').config(); 
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');

// const app = express();

// // --- Middleware ---
// app.use(cors()); 
// app.use(express.json());

// // --- Connect to MongoDB Atlas ---
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//     console.error("FATAL ERROR: MONGO_URI is not defined. Please check your .env file.");
//     process.exit(1);
// }

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected Successfully!'))
//   .catch(err => {
//     console.error('❌ MongoDB Connection Error:', err.message);
//     process.exit(1);
//   });

// // --- API Routes ---
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/items', require('./routes/items'));
// app.use('/api/admin', require('./routes/admin')); 
// app.use('/api/messages', require('./routes/messages'));

// // --- The block for serving static files has been removed ---

// // --- Server Initialization ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport Config (must be before middleware)
require('./config/passport')(passport);

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

// Express Session Middleware
app.use(session({
  secret: 'a secret key for the session', // Replace with a real secret in your .env
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// --- Connect to MongoDB Atlas ---
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined. Please check your .env file.");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/admin', require('./routes/admin')); 
app.use('/api/messages', require('./routes/messages'));

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
