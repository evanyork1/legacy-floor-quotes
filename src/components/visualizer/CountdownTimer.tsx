import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  duration?: number;
  onComplete?: () => void;
}

export const CountdownTimer = ({ duration = 60, onComplete }: CountdownTimerProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (progress >= 100) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / duration);
        return Math.min(100, newProgress);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [progress, duration, onComplete]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress circle */}
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
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-2xl border-2 border-cyan-400/30">
            <span className="text-6xl font-black text-navy-900">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
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
