
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Check } from 'lucide-react';
import type { ColorOption as ColorOptionType } from '@/constants/colorOptions';
import { cn } from '@/lib/utils';

interface ColorOptionProps {
  color: ColorOptionType;
  isSelected: boolean;
  onSelect: (colorId: string) => void;
  onPreview: (colorId: string) => void;
}

export const ColorOption = ({ color, isSelected, onSelect, onPreview }: ColorOptionProps) => {
  const [isThumbnailLoading, setIsThumbnailLoading] = useState(true);

  return (
    <div className="space-y-3 sm:space-y-4">
      <button
        onClick={() => onSelect(color.id)}
        className={cn(
          'w-full p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105',
          isSelected ? 'border-blue-600 shadow-lg' : 'border-gray-200'
        )}
      >
        <div className="w-full h-16 sm:h-20 rounded-lg mb-2 sm:mb-3 overflow-hidden relative">
          {isThumbnailLoading && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          <img
            src={color.thumbnail}
            alt={color.name}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isThumbnailLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={() => setIsThumbnailLoading(false)}
            loading="lazy"
          />
        </div>
        <p className="font-medium text-gray-900 text-sm sm:text-base">{color.name}</p>
        {isSelected && <Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mt-2" />}
      </button>

      {color.preview && (
        <Button variant="outline" size="sm" onClick={() => onPreview(color.id)} className="w-full text-xs sm:text-sm">
          See in Garage
        </Button>
      )}
    </div>
  );
};
