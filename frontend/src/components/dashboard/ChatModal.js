// frontend/src/components/dashboard/ChatModal.js

import React, { useState, useEffect, useRef } from 'react';
import messageService from '../../services/messageService';
import { format } from 'date-fns';

const ChatModal = ({ item, user, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null); // Ref to auto-scroll to the bottom

    // Function to scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Fetch messages when the component opens
    useEffect(() => {
        setIsLoading(true);
        messageService.getMessages(item._id)
            .then(response => {
                setMessages(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch messages:", err);
                setIsLoading(false);
            });
    }, [item._id]);

    // Scroll to bottom whenever messages change
    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return; // Don't send empty messages

        try {
            const response = await messageService.sendMessage(item._id, newMessage);
            // Add the new message to the state to update the UI instantly
            setMessages([...messages, response.data]);
            setNewMessage(''); // Clear the input field
        } catch (err) {
            alert("Failed to send message.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content chat-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Chat for: {item.itemName}</h3>
                    <button onClick={onClose} className="close-modal-btn">×</button>
                </div>
                <div className="chat-messages">
                    {isLoading ? (
                        <p>Loading messages...</p>
                    ) : (
                        messages.map(msg => (
                            <div key={msg._id} className={`message-bubble ${msg.sender._id === user.id ? 'sent' : 'received'}`}>
                                <div className="message-sender">{msg.sender.username}</div>
                                <div className="message-content">{msg.content}</div>
                                <div className="message-timestamp">{format(new Date(msg.createdAt), 'p')}</div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="chat-send-btn">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatModal;