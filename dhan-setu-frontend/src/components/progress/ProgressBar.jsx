// src/components/progress/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ step = 1, totalSteps = 5 }) => {
  const percentage = Math.min((step / totalSteps) * 100, 100);

  return (
    <div className="w-full mb-8">
      {/* Step labels */}
      <div className="flex justify-between mb-3 text-xs font-medium">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <span
            key={index}
            className={`transition-all duration-300 ${
              index + 1 <= step 
                ? "text-blue-700 font-bold scale-105" 
                : "text-gray-400"
            }`}
          >
            Step {index + 1}
          </span>
        ))}
      </div>

      {/* Progress track with enhanced styling */}
      <div className="relative w-full bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 rounded-full transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Percentage display with enhanced styling */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-gray-500 font-medium">
          {step} of {totalSteps} steps
        </p>
        <p className="text-sm text-blue-700 font-bold">
          {Math.round(percentage)}%
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
