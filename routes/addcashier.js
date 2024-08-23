const express = require('express');
const router = express.Router();
const { addCashier } = require('../controller/addcashier');

// POST route to add a cashier
router.post('/add', addCashier);

module.exports = router;