// src/components/common/Select.jsx
import React from "react";

const Select = ({
  label,
  id,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  error = "",
  className = "",
  ...rest
}) => {
  const hasEmptyOption = options.some((option) => {
    const val = option.value !== undefined ? option.value : option;
    return val === "";
  });

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-xs font-semibold text-slate-200 tracking-wide"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 rounded-xl border bg-slate-950/55 shadow-sm text-sm text-slate-100
            border-slate-600/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30
            transition-all duration-200 ease-out
            appearance-none
            ${error ? "border-red-500 focus:ring-red-300" : ""}
            ${className}
          `}
          {...rest}
        >
          {!hasEmptyOption && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const valueProp =
              option.value !== undefined ? option.value : option;
            const labelProp =
              option.label !== undefined ? option.label : option;
            return (
              <option key={valueProp} value={valueProp}>
                {labelProp}
              </option>
            );
          })}
        </select>

        {/* Dropdown arrow */}
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M6 8l4 4 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {error && <p className="text-xs text-rose-300 mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default Select;
