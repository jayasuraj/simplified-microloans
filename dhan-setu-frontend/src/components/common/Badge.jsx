import React from 'react';

/**
 * Badge Component - Modern status badges with variants
 */
const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon,
  pulse = false
}) => {
  const variants = {
    default: 'bg-slate-700/20 text-slate-200 border-slate-400/30',
    primary: 'bg-cyan-500/20 text-cyan-200 border-cyan-300/30',
    success: 'bg-emerald-500/20 text-emerald-200 border-emerald-300/30',
    warning: 'bg-amber-500/20 text-amber-200 border-amber-300/30',
    danger: 'bg-rose-500/20 text-rose-200 border-rose-300/30',
    info: 'bg-sky-500/20 text-sky-200 border-sky-300/30',
    purple: 'bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-300/30',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

export default Badge;
