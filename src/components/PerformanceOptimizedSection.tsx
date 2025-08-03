import React from 'react';

// Performance-optimized wrapper for heavy sections
export const PerformanceOptimizedSection = React.memo<{
  children: React.ReactNode;
  className?: string;
}>(({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
});

PerformanceOptimizedSection.displayName = 'PerformanceOptimizedSection';