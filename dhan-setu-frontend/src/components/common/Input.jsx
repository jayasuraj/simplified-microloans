// src/components/common/Input.jsx
import React from "react";

const Input = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  className = "",
  ...rest
}) => {
  return (
    <div className="w-full mb-5">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-semibold text-slate-200"
        >
          {label}
        </label>
      )}

      <div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-xl border bg-slate-950/55 shadow-sm
            text-sm text-slate-100
            border-slate-600/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30
            transition-all duration-200
            ${error ? "border-red-500 focus:ring-red-300" : ""}
            ${className}
          `}
          {...rest}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-xs text-rose-300 mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default Input;
