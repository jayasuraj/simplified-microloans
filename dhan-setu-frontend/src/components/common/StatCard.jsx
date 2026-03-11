import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatCard - Modern statistics card for dashboards
 */
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  loading = false,
  onClick,
  className = ''
}) => {
  const iconBgColors = {
    blue: 'bg-cyan-500/20 text-cyan-300 border border-cyan-300/30',
    green: 'bg-emerald-500/20 text-emerald-300 border border-emerald-300/30',
    amber: 'bg-amber-500/20 text-amber-300 border border-amber-300/30',
    red: 'bg-rose-500/20 text-rose-300 border border-rose-300/30',
    purple: 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-300/30',
    cyan: 'bg-sky-500/20 text-sky-300 border border-sky-300/30',
  };

  if (loading) {
    return (
      <div className={`bg-slate-900/50 rounded-xl shadow-sm border border-slate-600/30 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-slate-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-slate-900/55 rounded-xl shadow-sm border border-slate-600/30 p-6 transition-all hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-cyan-400/40' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-300 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-100 mb-2">{value}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          
          {(trend || trendValue) && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' && (
                <div className="flex items-center gap-1 text-emerald-300">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{trendValue}</span>
                </div>
              )}
              {trend === 'down' && (
                <div className="flex items-center gap-1 text-rose-300">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-medium">{trendValue}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-xl ${iconBgColors[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
