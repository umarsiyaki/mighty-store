
// services/cashierService.js
const Cashier = require('../models/cashierModel');

const addCashier = async (data) => {
  const newCashier = new Cashier(data);
  return await newCashier.save();
};

const getAllCashiers = async () => {
  return await Cashier.find();
};

module.exports = { addCashier, getAllCashiers };