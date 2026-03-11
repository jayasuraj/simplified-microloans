// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../../utils/constants';

/**
 * ProtectedRoute Component
 * Protects routes that require authentication
 * 
 * @param {Object} props
 * @param {React.Component} props.children - Child components to render if authenticated
 * @param {string} props.requiredRole - Required role to access the route (optional)
 * @param {string} props.redirectTo - Path to redirect if not authenticated (default: '/login')
 */
const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectTo = '/login' 
}) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const userRole = localStorage.getItem(STORAGE_KEYS.ROLE);

  // Check if user is authenticated
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has required role
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on user's role
    const roleDashboard = userRole === 'vendor' ? '/vendor' : '/lender';
    return <Navigate to={roleDashboard} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
