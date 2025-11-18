import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  duration?: number;
  onComplete?: () => void;
}

export const CountdownTimer = ({ duration = 60, onComplete }: CountdownTimerProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete?.();
    }, duration * 1000);

    return () => clearTimeout(timeout);
  }, [duration, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full animate-spin" style={{ animationDuration: '2s' }}>
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="#06b6d4"
            strokeWidth="10"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="70"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }}
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white text-sm font-medium">
          Creating your visualization...
        </p>
        <p className="text-white/80 text-xs mt-1">
          This may take up to a minute
        </p>
      </div>
    </div>
  );
};
