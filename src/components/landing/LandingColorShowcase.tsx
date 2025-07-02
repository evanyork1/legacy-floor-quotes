
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ColorOption } from "@/components/quote/ColorOption";
import { colorOptions } from "@/constants/colorOptions";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const LandingColorShowcase = () => {
  const [selectedColorPreview, setSelectedColorPreview] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);

  const openColorPreview = (colorId: string) => {
    setIsPreviewLoading(true);
    setSelectedColorPreview(colorId);
  };

  const closeColorPreview = () => {
    setSelectedColorPreview(null);
  };

  const selectedColorData = selectedColorPreview ? colorOptions.find(c => c.id === selectedColorPreview) : null;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {colorOptions.map(color => (
            <ColorOption
              key={color.id}
              color={color}
              isSelected={false}
              onSelect={() => {}} // No selection needed for showcase
              onPreview={openColorPreview}
            />
          ))}
        </div>
      </div>

      <Dialog open={selectedColorPreview !== null} onOpenChange={(isOpen) => !isOpen && closeColorPreview()}>
        <DialogContent className="max-w-4xl w-full mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              {selectedColorData?.name} in a Real Garage
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            {isPreviewLoading && <Skeleton className="w-full h-auto aspect-video rounded-lg" />}
            {selectedColorData?.preview && (
              <img
                src={selectedColorData.preview}
                alt={`${selectedColorData.name} in garage`}
                className={cn(
                  "w-full h-auto rounded-lg transition-opacity duration-300",
                  isPreviewLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsPreviewLoading(false)}
                loading="lazy"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
