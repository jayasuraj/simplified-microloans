// src/utils/toast.js
import { toast } from 'react-toastify';

/**
 * Toast notification helper functions
 */

export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  },

  error: (message, options = {}) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  },

  info: (message, options = {}) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  },

  warning: (message, options = {}) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    });
  },

  promise: async (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        pending: messages.pending || 'Processing...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong!',
      },
      {
        position: "top-right",
        ...options,
      }
    );
  },

  loading: (message = 'Loading...', options = {}) => {
    return toast.loading(message, {
      position: "top-right",
      ...options,
    });
  },

  update: (toastId, options = {}) => {
    toast.update(toastId, {
      ...options,
      isLoading: false,
    });
  },

  dismiss: (toastId) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },

  // Custom styled toasts
  custom: {
    networkError: () => {
      toast.error('Network error. Please check your internet connection.', {
        icon: '🌐',
      });
    },

    unauthorized: () => {
      toast.error('You are not authorized. Please login again.', {
        icon: '🔒',
      });
    },

    loginSuccess: () => {
      toast.success('Login successful! Redirecting...', {
        icon: '✅',
      });
    },

    logoutSuccess: () => {
      toast.info('You have been logged out successfully.', {
        icon: '👋',
      });
    },

    fileUploadSuccess: () => {
      toast.success('File uploaded successfully!', {
        icon: '📁',
      });
    },

    copySuccess: () => {
      toast.success('Copied to clipboard!', {
        icon: '📋',
        autoClose: 2000,
      });
    },

    walletConnected: (address) => {
      toast.success(`Wallet connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`, {
        icon: '💳',
      });
    },

    loanApproved: () => {
      toast.success('Loan approved successfully!', {
        icon: '🎉',
      });
    },

    paymentSuccess: () => {
      toast.success('Payment processed successfully!', {
        icon: '💰',
      });
    },
  },
};

export default showToast;
