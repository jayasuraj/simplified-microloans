// src/utils/constants.js

/**
 * User Roles
 */
export const ROLES = {
  VENDOR: "vendor",
  LENDER: "lender",
};

/**
 * Blockchain Constants
 */
export const ETH_DECIMALS = 18;
export const NETWORKS = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  SEPOLIA: 11155111,
  LOCALHOST: 1337,
};

/**
 * Progress Steps for Registration
 */
export const PROGRESS_STEPS = {
  AADHAR_VERIFIED: 1,
  PHONE_VERIFIED: 2,
  WALLET_CONNECTED: 3,
  PROFILE_COMPLETED: 4,
  REGISTRATION_DONE: 5,
};

/**
 * Loan Status
 */
export const LOAN_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DISBURSED: 'disbursed',
  REPAID: 'repaid',
  DEFAULTED: 'defaulted',
};

/**
 * Transaction Types
 */
export const TRANSACTION_TYPES = {
  LOAN_CREDIT: 'Loan Credit',
  REPAYMENT: 'Repayment',
  LOAN_REQUEST: 'Loan Request',
  INTEREST: 'Interest',
  PENALTY: 'Penalty',
};

/**
 * API Endpoints
 */
const LOCAL_API_FALLBACK = 'http://localhost:5000/api';
const PROD_API_FALLBACK = 'https://dhansetu-api.onrender.com/api';

export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? PROD_API_FALLBACK : LOCAL_API_FALLBACK);

export const API_ENDPOINTS = {
  // Vendor endpoints
  VENDOR_REGISTER: '/vendor/register',
  VENDOR_LOGIN: '/vendor/login',
  VENDOR_DASHBOARD: '/vendor/dashboard',
  VENDOR_LOANS: '/vendor/loans',
  VENDOR_PROFILE: '/vendor/profile',
  
  // Lender endpoints
  LENDER_REGISTER: '/lender/register',
  LENDER_LOGIN: '/lender/login',
  LENDER_DASHBOARD: '/lender/dashboard',
  LENDER_LOANS: '/lender/loans',
  LENDER_PROFILE: '/lender/profile',
  
  // OTP endpoints
  OTP_SEND: '/otp/send',
  OTP_VERIFY: '/otp/verify',
  
  // TOTP endpoints
  TOTP_GENERATE: '/totp/generate',
  TOTP_VERIFY: '/totp/verify',
};

/**
 * LocalStorage Keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  ROLE: 'role',
  USER_ID: 'userId',
  WALLET_ADDRESS: 'walletAddress',
  REMEMBER_ME: 'rememberMe',
};

/**
 * Validation Limits
 */
export const VALIDATION = {
  MIN_LOAN_AMOUNT: 500,
  MAX_LOAN_AMOUNT: 100000,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  AADHAAR_LENGTH: 12,
  PHONE_LENGTH: 10,
  OTP_LENGTH: 6,
};

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  SHORT: 'DD/MM/YYYY',
  LONG: 'DD MMMM YYYY',
  WITH_TIME: 'DD/MM/YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
};

/**
 * Toast Notification Settings
 */
export const TOAST_CONFIG = {
  POSITION: 'top-right',
  AUTO_CLOSE: 4000,
  HIDE_PROGRESS_BAR: false,
  CLOSE_ON_CLICK: true,
  PAUSE_ON_HOVER: true,
  DRAGGABLE: true,
};

/**
 * Pagination Constants
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};

/**
 * File Upload Limits
 */
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf'],
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized. Please login again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your inputs and try again.',
  NOT_FOUND: 'The requested resource was not found.',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  REGISTER_SUCCESS: 'Registration successful! Please verify your email.',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LOAN_REQUEST_SUBMITTED: 'Loan request submitted successfully!',
  LOAN_APPROVED: 'Loan approved successfully!',
  PAYMENT_SUCCESS: 'Payment processed successfully!',
};
