// frontend/src/services/messageService.js

import api from './api'; // Import the central api instance

// Get all messages for a specific item
const getMessages = (itemId) => {
  return api.get(`/messages/${itemId}`);
};

// Send a new message for a specific item
const sendMessage = (itemId, content) => {
  return api.post(`/messages/${itemId}`, { content });
};

const messageService = {
  getMessages,
  sendMessage,
};

export default messageService;