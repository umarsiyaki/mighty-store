
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
// Define your routes
router.get('/', messageController.getMessages);
router.post('/', messageController.sendMessage);


// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Post a new message
router.post('/', async (req, res) => {
    try {
        const { content } = req.body;
        const newMessage = new Message({ content });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a message
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// messages.js
const express = require('express');
const router = express.Router();

// Mock message data
const messages = [
  { title: "New order received", time: "10 minutes ago" },
  { title: "Product restocked", time: "20 minutes ago" }
];

// Route to fetch messages
router.get('/fetch', (req, res) => {
  res.json(messages);
});

module.exports = router;