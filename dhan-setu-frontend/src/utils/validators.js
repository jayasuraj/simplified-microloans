// src/utils/validators.js

/**
 * Validates Aadhaar number (12 digits)
 */
export function isValidAadhar(aadhar) {
  return /^\d{12}$/.test(aadhar);
}

/**
 * Validates Indian phone number (10 digits)
 */
export function isValidPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Validates email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates strong password (at least 8 chars, with letters and numbers)
 */
export function isStrongPassword(password) {
  if (password.length < 8) return false;
  // At least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
}

/**
 * Validates wallet address (Ethereum)
 */
export function isValidWalletAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validates PAN card number
 */
export function isValidPAN(pan) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
}

/**
 * Validates IFSC code
 */
export function isValidIFSC(ifsc) {
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
}

/**
 * Checks if value is empty or whitespace only
 */
export function isEmpty(value) {
  return !value || value.trim().length === 0;
}

/**
 * Validates positive number
 */
export function isPositiveNumber(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
}

/**
 * Validates amount range
 */
export function isInRange(value, min, max) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Get error message for field validation
 */
export function getValidationError(field, value, options = {}) {
  if (isEmpty(value)) {
    return `${field} is required`;
  }

  switch (field.toLowerCase()) {
    case 'email':
      return isValidEmail(value) ? null : 'Please enter a valid email address';
    
    case 'phone':
    case 'mobile':
      return isValidPhone(value) ? null : 'Please enter a valid 10-digit mobile number';
    
    case 'aadhaar':
    case 'aadhar':
      return isValidAadhar(value) ? null : 'Please enter a valid 12-digit Aadhaar number';
    
    case 'password':
      return isStrongPassword(value) 
        ? null 
        : 'Password must be at least 8 characters with letters and numbers';
    
    case 'wallet':
    case 'walletaddress':
      return isValidWalletAddress(value) ? null : 'Please enter a valid Ethereum wallet address';
    
    case 'pan':
      return isValidPAN(value) ? null : 'Please enter a valid PAN card number';
    
    case 'ifsc':
      return isValidIFSC(value) ? null : 'Please enter a valid IFSC code';
    
    default:
      if (options.min && value.length < options.min) {
        return `${field} must be at least ${options.min} characters`;
      }
      if (options.max && value.length > options.max) {
        return `${field} must not exceed ${options.max} characters`;
      }
      return null;
  }
}
