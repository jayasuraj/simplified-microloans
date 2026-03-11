// src/components/common/Button.jsx
import React from "react";

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 focus:ring-cyan-400 shadow-md hover:shadow-lg",
    secondary:
      "bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white hover:from-fuchsia-500 hover:to-indigo-500 focus:ring-fuchsia-400 shadow-md hover:shadow-lg",
    outline:
      "border border-cyan-300/35 text-cyan-300 bg-slate-900/40 hover:bg-cyan-500/10 focus:ring-cyan-400 hover:border-cyan-300",
    success:
      "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 focus:ring-emerald-400 shadow-md hover:shadow-lg",
    danger:
      "bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-400 hover:to-red-500 focus:ring-rose-400 shadow-md hover:shadow-lg",
    ghost:
      "text-slate-200 hover:bg-slate-800/60 focus:ring-slate-500",
  };

  const disabledStyles =
    "opacity-50 cursor-not-allowed hover:shadow-none hover:scale-100 active:scale-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? disabledStyles : "hover:-translate-y-0.5"}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Processing...
        </span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
};

export default Button;
