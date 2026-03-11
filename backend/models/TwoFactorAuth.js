// backend/models/TwoFactorAuth.js

const mongoose = require('mongoose');

const twoFactorAuthSchema = new mongoose.Schema({
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
  secret: {
    type: String,
    required: true,
  },
  backupCodes: [{
    code: { type: String, required: true },
    used: { type: Boolean, default: false },
  }],
  enabled: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index for faster lookups
twoFactorAuthSchema.index({ userId: 1, userModel: 1 });

module.exports = mongoose.model('TwoFactorAuth', twoFactorAuthSchema);
