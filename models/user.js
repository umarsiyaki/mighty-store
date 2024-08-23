
const mongoose = require('mongoose');


const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fistName: { type: String, required: true },
  surename: { type: String, required: true }, 
  
  middleName: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'cashier', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);