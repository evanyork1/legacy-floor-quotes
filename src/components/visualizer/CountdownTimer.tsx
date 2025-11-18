import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  duration?: number;
  onComplete?: () => void;
}

export const CountdownTimer = ({ duration = 30, onComplete }: CountdownTimerProps) => {
  const [countdown, setCountdown] = useState(duration);
  
  useEffect(() => {
    if (countdown <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onComplete]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (countdown / duration) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#06b6d4"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
            style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-white drop-shadow-lg">
            {countdown}
          </span>
        </div>
      </div>
    </div>
  );
};
