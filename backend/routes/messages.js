// // backend/routes/messages.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authMiddleware');
// const { getMessages, sendMessage } = require('../controllers/messageController');

// // GET /api/messages/:itemId - Get all messages for an item
// router.get('/:itemId', auth, getMessages);

// // POST /api/messages/:itemId - Send a message for an item
// router.post('/:itemId', auth, sendMessage);

// module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getMessages, sendMessage } = require('../controllers/messageController');

router.get('/:itemId', auth, getMessages);
router.post('/:itemId', auth, sendMessage);

module.exports = router;