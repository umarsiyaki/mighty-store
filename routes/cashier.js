
const express = require('express');

//i have a Cashier model (for MongoDB/Mongoose)
const Cashier = require('../models/Cashier'); // Import Cashier model

// Add cashier to database
router.post('/cashier/add', async (req, res) => {
    try {
        const { username, email, phone, address, password } = req.body;

        // Create new cashier object
        const newCashier = new Cashier({
            username,
            email,
            phone,
            address,
            password, // Ensure you hash the password in production
        });

        // Save cashier to database
        await newCashier.save();

        // Log the action
        console.log(`Cashier added: ${username}`);

        // Send a response back
        res.json({ success: true, message: 'Cashier added successfully' });
    } catch (err) {
        console.error('Error adding cashier:', err);
        res.json({ success: false, message: 'Error adding cashier' });
    }
});

// Update cashier in database
router.put('/cashier/update/:id', async (req, res) => {
    try {
        const cashierId = req.params.id;
        const updatedData = req.body;

        // Find cashier by ID and update
        const updatedCashier = await Cashier.findByIdAndUpdate(cashierId, updatedData, { new: true });

        if (!updatedCashier) {
            return res.json({ success: false, message: 'Cashier not found' });
        }

        // Log the action
        console.log(`Cashier updated: ${updatedCashier.username}`);

        res.json({ success: true, message: 'Cashier updated successfully' });
    } catch (err) {
        console.error('Error updating cashier:', err);
        res.json({ success: false, message: 'Error updating cashier' });
    }
});


// Delete cashier from database
router.delete('/cashier/delete/:id', async (req, res) => {
    try {
        const cashierId = req.params.id;

        // Find cashier by ID and delete
        const deletedCashier = await Cashier.findByIdAndDelete(cashierId);

        if (!deletedCashier) {
            return res.json({ success: false, message: 'Cashier not found' });
        }

        // Log the action
        console.log(`Cashier deleted: ${deletedCashier.username}`);

        res.json({ success: true, message: 'Cashier deleted successfully' });
    } catch (err) {
        console.error('Error deleting cashier:', err);
        res.json({ success: false, message: 'Error deleting cashier' });
    }
});


// Assuming you're using Express and a database like MongoDB or MySQL

const express = require('express');
const router = express.Router();

// Assuming you have a Cashier model (for MongoDB/Mongoose)
const Cashier = require('../models/Cashier'); // Import Cashier model

// Add cashier to database
router.post('/cashier/add', async (req, res) => {
    try {
        const { username, email, phone, address, password } = req.body;

        // Create new cashier object
        const newCashier = new Cashier({
            username,
            email,
            phone,
            address,
            password, // Ensure you hash the password in production
        });

        // Save cashier to database
        await newCashier.save();

        // Log the action
        console.log(`Cashier added: ${username}`);

        // Send a response back
        res.json({ success: true, message: 'Cashier added successfully' });
    } catch (err) {
        console.error('Error adding cashier:', err);
        res.json({ success: false, message: 'Error adding cashier' });
    }
});

const express = require('express');
const CashierController = require('../controllers/CashierController');

// Routes for cashier operations
router.get('/profile', CashierController.getProfile);
router.post('/profile/update', CashierController.updateProfile);
router.post('/confirm-order', CashierController.confirmOrder);
router.post('/add-product', CashierController.addProduct);
router.get('/performance', CashierController.getPerformance);

module.exports = router;
