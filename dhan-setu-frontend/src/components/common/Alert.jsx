import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Modern Alert Component
 */
const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  icon: CustomIcon,
}) => {
  const types = {
    success: {
      bgColor: 'bg-emerald-500/15',
      borderColor: 'border-emerald-300/30',
      iconColor: 'text-emerald-300',
      textColor: 'text-emerald-100',
      Icon: CheckCircle,
    },
    error: {
      bgColor: 'bg-rose-500/15',
      borderColor: 'border-rose-300/30',
      iconColor: 'text-rose-300',
      textColor: 'text-rose-100',
      Icon: AlertCircle,
    },
    warning: {
      bgColor: 'bg-amber-500/15',
      borderColor: 'border-amber-300/30',
      iconColor: 'text-amber-300',
      textColor: 'text-amber-100',
      Icon: AlertTriangle,
    },
    info: {
      bgColor: 'bg-cyan-500/15',
      borderColor: 'border-cyan-300/30',
      iconColor: 'text-cyan-300',
      textColor: 'text-cyan-100',
      Icon: Info,
    },
  };

  const config = types[type];
  const Icon = CustomIcon || config.Icon;

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4 shadow-sm backdrop-blur-sm ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <Icon className={`${config.iconColor} w-5 h-5 mt-0.5 flex-shrink-0`} />
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-bold ${config.textColor} mb-1`}>
              {title}
            </h3>
          )}
          {message && (
            <p className={`text-sm ${config.textColor}`}>
              {message}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`${config.iconColor} hover:opacity-75 transition-opacity ml-3 flex-shrink-0`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
