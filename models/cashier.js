const mongoose = require('mongoose');

const CashierSchema = new mongoose.Schema({
    username: String,
    email: String,
    phoneNumber: String,
    address: String,
    password: String
});

const Cashier = mongoose.model('Cashier', CashierSchema);

module.exports = Cashier;


const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


Cashier.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'Cashier' });

module.exports = Cashier;

// models/cashierModel.js
const mongoose = require('mongoose');

const cashierSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Cashier = mongoose.model('Cashier', cashierSchema);
module.exports = Cashier;