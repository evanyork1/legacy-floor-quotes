
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { FormData, ColorOption } from './types';

interface Step5Props {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  colorOptions: ColorOption[];
}

export const Step5ColorChoice = ({ formData, updateFormData, colorOptions }: Step5Props) => {
  const [selectedColorPreview, setSelectedColorPreview] = useState<string | null>(null);

  const handleColorSelection = (colorId: string) => {
    updateFormData('colorChoice', colorId);
  };

  const openColorPreview = (colorId: string) => {
    setSelectedColorPreview(colorId);
  };

  const closeColorPreview = () => {
    setSelectedColorPreview(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Choose Your Look</h2>
        <p className="text-base sm:text-lg text-gray-600">Select a floor color</p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {colorOptions.map(color => <div key={color.id} className="space-y-3 sm:space-y-4">
            <button onClick={() => handleColorSelection(color.id)} className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 ${formData.colorChoice === color.id ? 'border-blue-600 shadow-lg' : 'border-gray-200'}`}>
              <div className="w-full h-16 sm:h-20 rounded-lg mb-2 sm:mb-3 overflow-hidden">
                <img src={color.thumbnail} alt={color.name} className="w-full h-full object-cover" />
              </div>
              <p className="font-medium text-gray-900 text-sm sm:text-base">{color.name}</p>
              {formData.colorChoice === color.id && <Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mt-2" />}
            </button>

            {color.preview && <Button variant="outline" size="sm" onClick={() => openColorPreview(color.id)} className="w-full text-xs sm:text-sm">
              See in Garage
            </Button>}
          </div>)}
        </div>
      </div>

      <Dialog open={selectedColorPreview !== null} onOpenChange={closeColorPreview}>
        <DialogContent className="max-w-4xl w-full mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              {selectedColorPreview && colorOptions.find(c => c.id === selectedColorPreview)?.name} in a Real Garage
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            {selectedColorPreview && <img src={colorOptions.find(c => c.id === selectedColorPreview)?.preview} alt={`${colorOptions.find(c => c.id === selectedColorPreview)?.name} in garage`} className="w-full h-auto rounded-lg" />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
