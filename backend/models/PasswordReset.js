// backend/models/PasswordReset.js

const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userModel',
  },
  userModel: {
    type: String,
    required: true,
    enum: ['Vendor', 'Lender'],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 3600000), // 1 hour from now
    index: { expires: 0 }, // Auto-delete when expired
  },
  used: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index for faster lookups
passwordResetSchema.index({ token: 1, used: 1 });
passwordResetSchema.index({ email: 1 });

module.exports = mongoose.model('PasswordReset', passwordResetSchema);
