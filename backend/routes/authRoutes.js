// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');

/**
 * Password Reset Routes
 */

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/validate-reset-token - Validate reset token
router.post('/validate-reset-token', authController.validateResetToken);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', authController.resetPassword);

/**
 * Two-Factor Authentication Routes
 * All 2FA routes require authentication
 */

// POST /api/auth/2fa/generate - Generate 2FA secret and QR code
router.post('/2fa/generate', authenticate, authController.generate2FA);

// POST /api/auth/2fa/verify - Verify 2FA code and enable 2FA
router.post('/2fa/verify', authenticate, authController.verify2FA);

// POST /api/auth/2fa/disable - Disable 2FA (requires password)
router.post('/2fa/disable', authenticate, authController.disable2FA);

module.exports = router;
