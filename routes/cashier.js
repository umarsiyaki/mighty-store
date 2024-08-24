
const express = require('express');
const router = express.Router();

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
const router = express.Router();
const Cashier = require('../models/Cashier');

router.get('/', async (req, res) => {
try {
const cashiers = await Cashier.find().exec();
res.json(cashiers);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Error fetching cashiers' });
}
});

router.post('/', async (req, res) => {
try {
const cashier = new Cashier(req.body);
await cashier.save();
res.json(cashier);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Error creating cashier' });
}
});

module.exports = router;
