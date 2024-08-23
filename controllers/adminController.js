const Cashier = require('../models/Cashier');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Revenue = require('../models/Revenue');

exports.getProfile = (req, res) => {
    User.findById(req.user.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateProfile = (req, res) => {
    const { name, email, password, role } = req.body;
    User.findByIdAndUpdate(req.user.id, { name, email, password, role }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
};

// Other methods for adding cashiers, getting revenue, etc.
