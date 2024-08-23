const Revenue = require('../models/Revenue');

exports.getDailyRevenue = (req, res) => {
    Revenue.find({ date: new Date().toISOString().slice(0, 10) })
        .then(revenue => res.json(revenue))
        .catch(err => res.status(500).json({ error: err.message }));
};

// Other methods for weekly, monthly, and yearly revenue.
