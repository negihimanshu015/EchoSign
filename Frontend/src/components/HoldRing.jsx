import React from 'react';

const HoldRing = ({ streak, streakRequired }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (streak / streakRequired) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="w-64 h-64 transform -rotate-90">
        {/* Background track */}
        <circle
          cx="128"
          cy="128"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
          fill="transparent"
          className="scale-[2.5] origin-center"
        />
        {/* Progress ring */}
        <circle
          cx="128"
          cy="128"
          r={radius}
          stroke="#caf0f8"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="scale-[2.5] origin-center animate-ring-fill"
        />
      </svg>
      {streak > 0 && (
        <div className="absolute animate-pulse-ring w-48 h-48 border-2 border-[#caf0f8]/30 rounded-full" />
      )}
    </div>
  );
};

export default HoldRing;
