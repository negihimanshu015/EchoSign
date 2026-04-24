import React from 'react';

const HoldRing = ({ streak, streakRequired }) => {
  const size = 256;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 108;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  // Step the progress in 1/4 increments
  const rawProgress = streakRequired > 0 ? streak / streakRequired : 0;
  const steppedProgress = Math.floor(rawProgress * 4) / 4;
  const offset = circumference * (1 - Math.min(steppedProgress, 1));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress ring */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#caf0f8"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="animate-ring-fill"
        />
      </svg>
      {streak > 0 && (
        <div className="absolute animate-pulse-ring w-48 h-48 border-2 border-[#caf0f8]/30 rounded-full" />
      )}
    </div>
  );
};

export default HoldRing;
