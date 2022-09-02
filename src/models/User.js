const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  balance: {
    type: Number,
    default: 10,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  pin: {
    type: Number,
    default: 12345,
    required: true,
    minlength: 5,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hasing password using bcrypt
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
