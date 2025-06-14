
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ExamplePhotoProps {
  src: string;
  alt: string;
}

export const ExamplePhoto = ({ src, alt }: ExamplePhotoProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-48 sm:h-96 flex items-center justify-center overflow-hidden relative">
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover rounded-xl transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
      />
    </div>
  );
};
