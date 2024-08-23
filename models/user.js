const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true }, 
  middleName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'cashier', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
