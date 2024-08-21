
// controllers/cashierController.js
const { addCashier, getAllCashiers } = require('../services/cashierService');

exports.createCashier = async (req, res) => {
  try {
    const newCashier = await addCashier(req.body);
    res.status(201).json(newCashier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchCashiers = async (req, res) => {
  try {
    const cashiers = await getAllCashiers();
    res.status(200).json(cashiers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};