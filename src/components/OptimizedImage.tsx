interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  priority?: boolean;
}

/**
 * Renders an <img> immediately and eagerly. No IntersectionObserver / lazy
 * gating — every image is present in the initial DOM so it appears in the
 * prerendered HTML that crawlers receive and loads without waiting for scroll.
 */
export const OptimizedImage = ({
  src,
  alt,
  className,
  style,
  onClick,
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
      loading="eager"
      decoding="async"
    />
  );
};
