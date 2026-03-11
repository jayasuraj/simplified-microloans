// src/utils/formatters.js

/**
 * Format Wei to ETH
 */
export function formatEth(amountInWei) {
  const eth = parseFloat(amountInWei) / 10 ** 18;
  return `${eth.toFixed(4)} ETH`;
}

/**
 * Format ISO date to readable format
 */
export function formatDate(isoDate) {
  if (!isoDate) return 'N/A';
  const date = new Date(isoDate);
  if (isNaN(date)) return 'Invalid Date';
  
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format date with time
 */
export function formatDateTime(isoDate) {
  if (!isoDate) return 'N/A';
  const date = new Date(isoDate);
  if (isNaN(date)) return 'Invalid Date';
  
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format currency in INR
 */
export function formatINR(amount) {
  const num = parseFloat(amount);
  if (isNaN(num)) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Format large numbers with K, M suffixes
 */
export function formatNumber(num) {
  const number = parseFloat(num);
  if (isNaN(number)) return '0';
  
  if (number >= 10000000) {
    return (number / 10000000).toFixed(2) + ' Cr';
  }
  if (number >= 100000) {
    return (number / 100000).toFixed(2) + ' L';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(2) + ' K';
  }
  return number.toFixed(2);
}

/**
 * Format wallet address (shorten)
 */
export function formatWalletAddress(address) {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Format phone number
 */
export function formatPhone(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  return phone;
}

/**
 * Format Aadhaar number (with masking)
 */
export function formatAadhaar(aadhaar, masked = false) {
  if (!aadhaar) return '';
  const cleaned = aadhaar.replace(/\D/g, '');
  
  if (masked && cleaned.length === 12) {
    return `XXXX XXXX ${cleaned.substring(8)}`;
  }
  
  if (cleaned.length === 12) {
    return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 8)} ${cleaned.substring(8)}`;
  }
  return aadhaar;
}

/**
 * Format percentage
 */
export function formatPercent(value, decimals = 2) {
  const num = parseFloat(value);
  if (isNaN(num)) return '0%';
  return `${num.toFixed(decimals)}%`;
}

/**
 * Format time ago
 */
export function formatTimeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return formatDate(date);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 50) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Capitalize first letter of each word
 */
export function toTitleCase(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
