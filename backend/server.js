// // This line must be at the very top
// require('dotenv').config(); 

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

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
// // Use the authentication routes
// app.use('/api/auth', require('./routes/auth'));

// // Use the item routes
// app.use('/api/items', require('./routes/items'));

// // In server.js

// // ... other routes
// app.use('/api/admin', require('./routes/admin')); 
// app.use('/api/messages', require('./routes/messages')); // Add this line
// // --- Server Initialization ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// require('dotenv').config(); 
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path'); // Import the path module

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
// // app.use('/api/auth', require('./routes/auth'));
// // app.use('/api/items', require('./routes/items'));
// // app.use('/api/admin', require('./routes/admin')); 
// // app.use('/api/messages', require('./routes/messages'));


// try {
//   app.use('/api/auth', require('./routes/auth'));
//   console.log("✅ Loaded /api/auth routes");
// } catch (err) {
//   console.error("❌ Error loading /api/auth:", err);
// }

// try {
//   app.use('/api/items', require('./routes/items'));
//   console.log("✅ Loaded /api/items routes");
// } catch (err) {
//   console.error("❌ Error loading /api/items:", err);
// }

// try {
//   app.use('/api/admin', require('./routes/admin')); 
//   console.log("✅ Loaded /api/admin routes");
// } catch (err) {
//   console.error("❌ Error loading /api/admin:", err);
// }

// try {
//   app.use('/api/messages', require('./routes/messages'));
//   console.log("✅ Loaded /api/messages routes");
// } catch (err) {
//   console.error("❌ Error loading /api/messages:", err);
// }

// // --- Serve Static Assets in Production ---
// // This code runs only when you deploy your app to a hosting service
// // if (process.env.NODE_ENV === 'production') {
// //   // Set the static folder where the React build lives
// //   app.use(express.static(path.join(__dirname, '../frontend/build')));

// //   // For any request that doesn't match an API route, send back the main index.html file
// //   app.get('*', (req, res) => {
// //     res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
// //   });
// // }


// if (process.env.NODE_ENV === 'production') {
//   const staticPath = path.join(__dirname, '../frontend/build');
//   console.log("Serving static from:", staticPath);

//   app.use(express.static(staticPath));

//   console.log("Registering catch-all route: '*'");

// app.get(/(.*)/, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
// });


// }

// // --- Server Initialization ---
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/admin', require('./routes/admin')); 
app.use('/api/messages', require('./routes/messages'));

// --- The block for serving static files has been removed ---

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));