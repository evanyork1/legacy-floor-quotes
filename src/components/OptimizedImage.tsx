import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  style, 
  onClick, 
  priority = false 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const onIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsInView(true);
    }
  }, []);

  // Set up intersection observer for lazy loading
  const setRef = useCallback((node: HTMLImageElement | null) => {
    if (imgRef.current) {
      // Clean up previous observer
    }
    
    if (node && !priority) {
      const observer = new IntersectionObserver(onIntersection, {
        rootMargin: '50px'
      });
      observer.observe(node);
      imgRef.current = node;
    }
  }, [onIntersection, priority]);

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {(isInView || priority) && (
        <img
          ref={setRef}
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={onLoad}
          onClick={onClick}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
};