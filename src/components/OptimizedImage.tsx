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
    if (imgRef.current && !priority) {
      // Clean up previous observer
      const observer = new IntersectionObserver(() => {});
      observer.disconnect();
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
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: isLoaded ? 1 : 0 }}
          onLoad={onLoad}
          onClick={onClick}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
};