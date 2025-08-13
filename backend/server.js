// This line must be at the very top
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

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
// Use the authentication routes
app.use('/api/auth', require('./routes/auth'));

// Use the item routes
app.use('/api/items', require('./routes/items'));

// In server.js

// ... other routes
app.use('/api/admin', require('./routes/admin')); 
app.use('/api/messages', require('./routes/messages')); // Add this line
// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
