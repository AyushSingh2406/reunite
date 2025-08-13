// backend/controllers/messageController.js
const Message = require('../models/Message');
const Item = require('../models/Item');

// Get all messages for a specific item claim
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ item: req.params.itemId })
            .populate('sender', 'username')
            .sort({ createdAt: 'asc' });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Send a new message
exports.sendMessage = async (req, res) => {
    const { content } = req.body;
    try {
        const item = await Item.findById(req.params.itemId);
        if (!item || item.status !== 'Claimed') {
            return res.status(404).json({ msg: 'Item not found or not available for chat.' });
        }

        // Determine who the receiver is
        const isOwner = item.user.equals(req.user.id);
        const receiverId = isOwner ? item.claimedBy : item.user;

        if (!receiverId) {
            return res.status(400).json({ msg: 'Cannot determine the recipient.'});
        }

        const newMessage = new Message({
            item: req.params.itemId,
            sender: req.user.id,
            receiver: receiverId,
            content
        });

        await newMessage.save();
        const populatedMessage = await newMessage.populate('sender', 'username');
        res.status(201).json(populatedMessage);

    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};