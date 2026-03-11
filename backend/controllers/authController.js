// backend/controllers/authController.js

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const Vendor = require('../models/Vendor');
const Lender = require('../models/Lender');
const PasswordReset = require('../models/PasswordReset');
const TwoFactorAuth = require('../models/TwoFactorAuth');
const { sendPasswordResetEmail, send2FAEnabledEmail } = require('../utils/emailService');

/**
 * Request password reset - sends email with reset token
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Check if user exists in Vendor or Lender collection
    let user = await Vendor.findOne({ email: email.toLowerCase() });
    let userModel = 'Vendor';

    if (!user) {
      user = await Lender.findOne({ email: email.toLowerCase() });
      userModel = 'Lender';
    }

    if (!user) {
      // Don't reveal if email exists or not (security best practice)
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Delete any existing reset tokens for this user
    await PasswordReset.deleteMany({ userId: user._id, userModel });

    // Create new password reset record
    await PasswordReset.create({
      userId: user._id,
      userModel,
      email: user.email,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    });

    // Send email with reset link (token is unhashed in URL)
    const emailResult = await sendPasswordResetEmail(
      user.email,
      resetToken,
      user.fullname || 'User'
    );

    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error);
    }

    res.status(200).json({
      success: true,
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request',
      error: error.message,
    });
  }
};

/**
 * Validate password reset token
 */
exports.validateResetToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Reset token is required',
      });
    }

    // Hash the token to match stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find valid reset token
    const resetRecord = await PasswordReset.findOne({
      token: hashedToken,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Invalid or expired reset token',
      });
    }

    res.status(200).json({
      success: true,
      valid: true,
      message: 'Token is valid',
    });
  } catch (error) {
    console.error('Validate token error:', error);
    res.status(500).json({
      success: false,
      valid: false,
      message: 'Failed to validate reset token',
    });
  }
};

/**
 * Reset password with valid token
 */
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required',
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    // Hash the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find valid reset token
    const resetRecord = await PasswordReset.findOne({
      token: hashedToken,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    // Get user model
    const UserModel = resetRecord.userModel === 'Vendor' ? Vendor : Lender;
    const user = await UserModel.findById(resetRecord.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Mark reset token as used
    resetRecord.used = true;
    await resetRecord.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password',
      error: error.message,
    });
  }
};

/**
 * Generate 2FA secret and QR code
 */
exports.generate2FA = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;
    const userModel = req.user?.role === 'lender' ? 'Lender' : 'Vendor';

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // Get user
    const UserModel = userModel === 'Vendor' ? Vendor : Lender;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `DhanSetu (${user.email})`,
      issuer: 'DhanSetu',
    });

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    // Save secret temporarily (not enabled until verified)
    let twoFARecord = await TwoFactorAuth.findOne({ userId, userModel });

    if (twoFARecord) {
      twoFARecord.secret = secret.base32;
      twoFARecord.enabled = false;
      twoFARecord.verified = false;
      await twoFARecord.save();
    } else {
      twoFARecord = await TwoFactorAuth.create({
        userId,
        userModel,
        secret: secret.base32,
        enabled: false,
        verified: false,
      });
    }

    res.status(200).json({
      success: true,
      secret: secret.base32,
      qrCode: qrCodeUrl,
    });
  } catch (error) {
    console.error('Generate 2FA error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate 2FA setup',
      error: error.message,
    });
  }
};

/**
 * Verify 2FA code and enable 2FA
 */
exports.verify2FA = async (req, res) => {
  try {
    const { code, secret } = req.body;
    const userId = req.user?.id || req.userId;
    const userModel = req.user?.role === 'lender' ? 'Lender' : 'Vendor';

    if (!userId || !code || !secret) {
      return res.status(400).json({
        success: false,
        message: 'Code and secret are required',
      });
    }

    // Verify the code
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: code,
      window: 2, // Allow 2 time steps before/after
    });

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code',
      });
    }

    // Generate backup codes
    const backupCodes = [];
    for (let i = 0; i < 10; i++) {
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      backupCodes.push({
        code,
        used: false,
      });
    }

    // Update 2FA record
    const twoFARecord = await TwoFactorAuth.findOneAndUpdate(
      { userId, userModel },
      {
        enabled: true,
        verified: true,
        backupCodes,
      },
      { new: true }
    );

    if (!twoFARecord) {
      return res.status(404).json({
        success: false,
        message: '2FA setup not found',
      });
    }

    // Update user model
    const UserModel = userModel === 'Vendor' ? Vendor : Lender;
    await UserModel.findByIdAndUpdate(userId, { enable2FA: true });

    // Send confirmation email
    const user = await UserModel.findById(userId);
    await send2FAEnabledEmail(user.email, user.fullname || 'User');

    res.status(200).json({
      success: true,
      message: '2FA enabled successfully',
      backupCodes: backupCodes.map(bc => bc.code),
    });
  } catch (error) {
    console.error('Verify 2FA error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify 2FA',
      error: error.message,
    });
  }
};

/**
 * Disable 2FA
 */
exports.disable2FA = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user?.id || req.userId;
    const userModel = req.user?.role === 'lender' ? 'Lender' : 'Vendor';

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required to disable 2FA',
      });
    }

    // Get user and verify password
    const UserModel = userModel === 'Vendor' ? Vendor : Lender;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }

    // Disable 2FA
    await TwoFactorAuth.findOneAndUpdate(
      { userId, userModel },
      { enabled: false, verified: false }
    );

    await UserModel.findByIdAndUpdate(userId, { enable2FA: false });

    res.status(200).json({
      success: true,
      message: '2FA disabled successfully',
    });
  } catch (error) {
    console.error('Disable 2FA error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to disable 2FA',
      error: error.message,
    });
  }
};

module.exports = exports;
