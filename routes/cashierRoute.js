
const express = require('express');
const router = express.Router();
const Cashier = require('../models/cashier');

// Add Cashier Route
router.post('/add', async (req, res) => {
    try {
        const { username, email, phone, address, password } = req.body;
        const newCashier = new Cashier({ username, email, phoneNumber: phone, address, password });
        await newCashier.save();
        res.json({ success: true, message: 'Cashier added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding cashier' });
    }
});

// Update Cashier Route (placeholder, define the correct logic for product updates)
router.post('/update', async (req, res) => {
    try {
        const { name, category, size, type, price, quantity } = req.body;
        // Logic to find and update cashier/product
        res.json({ success: true, message: 'Cashier updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating cashier' });
    }
});

module.exports = router;

