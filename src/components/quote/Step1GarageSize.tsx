
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Check } from 'lucide-react';
import type { FormData, AdditionalSpace } from './types';

interface Step1Props {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

export const Step1GarageSize = ({ formData, updateFormData }: Step1Props) => {
  const [showAdditionalSpace, setShowAdditionalSpace] = useState(false);
  const [currentAdditionalSpace, setCurrentAdditionalSpace] = useState<AdditionalSpace>({
    type: "",
    sqft: "",
    spaceType: "",
    otherSpaceType: ""
  });

  const addAdditionalSpace = () => {
    if (currentAdditionalSpace.type) {
      updateFormData('additionalSpaces', [...formData.additionalSpaces, currentAdditionalSpace]);
      setCurrentAdditionalSpace({ type: "", sqft: "", spaceType: "", otherSpaceType: "" });
      setShowAdditionalSpace(false);
    }
  };

  const removeAdditionalSpace = (index: number) => {
    const newSpaces = formData.additionalSpaces.filter((_, i) => i !== index);
    updateFormData('additionalSpaces', newSpaces);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">What size is your garage?</h2>
        <p className="text-base sm:text-lg text-gray-600 px-4">Choose the option that best describes your space</p>
      </div>

      <div className="grid gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
        {[{
          id: "custom",
          label: "Know Exact Square Footage?",
          desc: "We'll ask for details next"
        }, {
          id: "2-car",
          label: "2-Car Garage",
          desc: "Approx. 400–450 sq ft"
        }, {
          id: "3-car",
          label: "3-Car Garage",
          desc: "Approx. 600–700 sq ft"
        }, {
          id: "4-car",
          label: "4-Car Garage",
          desc: "Approx. 800–1,000 sq ft"
        }].map(option => <button key={option.id} onClick={() => updateFormData('garageType', option.id)} className={`p-4 sm:p-6 rounded-xl border-2 text-left transition-all hover:scale-[1.02] relative ${option.id === "custom" ? `bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border-2 border-transparent bg-clip-padding shadow-lg ${formData.garageType === option.id ? 'before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:-z-10 before:animate-pulse shadow-2xl shadow-purple-400/30' : 'before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-orange-500 before:-z-10 hover:shadow-xl hover:shadow-purple-400/20'}` : formData.garageType === option.id ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-blue-300'}`} style={option.id === "custom" ? {
          background: formData.garageType === option.id ? 'linear-gradient(135deg, #fdf4ff, #fef7ed, #fff7ed)' : 'linear-gradient(135deg, #faf5ff, #fef2f2, #fff7ed)',
          position: 'relative'
        } : {}}>
          {option.id === "custom" && <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-20 blur-sm -z-10" />}
          <div className="flex items-center relative z-10">
            <div className="flex-1">
              <h3 className={`text-lg sm:text-xl font-semibold ${option.id === "custom" ? 'text-purple-900' : 'text-gray-900'}`}>
                {option.label}
              </h3>
              <p className={`mt-1 text-sm sm:text-base ${option.id === "custom" ? 'text-purple-700' : 'text-gray-600'}`}>
                {option.desc}
              </p>
            </div>
            <div className="pl-4">
              {formData.garageType === option.id && <Check className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 ${option.id === "custom" ? 'text-purple-600' : 'text-blue-600'}`} />}
            </div>
          </div>
          {option.id === "custom" && <div className="absolute top-3 right-[-34px] w-auto whitespace-nowrap transform rotate-45 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 shadow-lg">
            MOST ACCURATE
          </div>}
        </button>)}
      </div>

      <div className="mt-8 sm:mt-12 max-w-2xl mx-auto px-4">
        <div className="border-t-2 border-dashed border-gray-300 pt-6 sm:pt-8">
          <button onClick={() => setShowAdditionalSpace(!showAdditionalSpace)} className="w-full p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-all">
            <div className="flex items-center justify-center">
              <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-2 sm:mr-3" />
              <span className="text-base sm:text-lg font-semibold text-purple-700">Add Additional Space</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-600 mt-1">Storage, workshop, or other areas</p>
          </button>
        </div>

        {showAdditionalSpace && <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-purple-50 rounded-xl border border-purple-200">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Additional Space Details</h3>
          <div className="grid gap-3 sm:gap-4">
            {[{ id: "garage-floor", label: "Garage Floor" }, { id: "storage", label: "Extra storage" }, { id: "warehouse", label: "Warehouse" }, { id: "detached", label: "Detached garage" }, { id: "other", label: "Other" }].map(option => <button key={option.id} onClick={() => setCurrentAdditionalSpace(prev => ({ ...prev, type: option.id }))} className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${currentAdditionalSpace.type === option.id ? 'border-purple-600 bg-purple-100' : 'border-gray-200 hover:border-purple-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{option.label}</h4>
                </div>
                {currentAdditionalSpace.type === option.id && <Check className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />}
              </div>
            </button>)}
          </div>

          {currentAdditionalSpace.type === "other" && <div className="mt-3 sm:mt-4">
            <Input value={currentAdditionalSpace.otherSpaceType} onChange={e => setCurrentAdditionalSpace(prev => ({ ...prev, otherSpaceType: e.target.value }))} placeholder="Please describe your space" className="h-10 sm:h-12" />
          </div>}

          {currentAdditionalSpace.type === "custom" && <div className="mt-4 sm:mt-6 space-y-3">
            <Input type="number" value={currentAdditionalSpace.sqft} onChange={e => setCurrentAdditionalSpace(prev => ({ ...prev, sqft: e.target.value }))} placeholder="Enter square footage" className="h-12" />
            <div className="grid gap-2">
              {[{ id: "storage", label: "Extra storage" }, { id: "warehouse", label: "Warehouse" }, { id: "detached", label: "Detached garage" }, { id: "other", label: "Other" }].map(option => <button key={option.id} onClick={() => setCurrentAdditionalSpace(prev => ({ ...prev, spaceType: option.id }))} className={`p-3 rounded-lg border text-left transition-all ${currentAdditionalSpace.spaceType === option.id ? 'border-purple-600 bg-purple-100' : 'border-gray-200 hover:border-purple-300'}`}>
                {option.label}
              </button>)}
            </div>
            {currentAdditionalSpace.spaceType === "other" && <Input value={currentAdditionalSpace.otherSpaceType} onChange={e => setCurrentAdditionalSpace(prev => ({ ...prev, otherSpaceType: e.target.value }))} placeholder="Please describe your space" className="h-12" />}
          </div>}

          <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
            <Button onClick={addAdditionalSpace} disabled={!currentAdditionalSpace.type} className="text-sm sm:text-base">
              Add Space
            </Button>
            <Button variant="outline" onClick={() => setShowAdditionalSpace(false)} className="text-sm sm:text-base">
              Cancel
            </Button>
          </div>
        </div>}

        {formData.additionalSpaces.length > 0 && <div className="mt-4 sm:mt-6">
          <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Added Spaces ({formData.additionalSpaces.length})</h3>
          <div className="space-y-2">
            {formData.additionalSpaces.map((space, index) => <div key={index} className="p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
              <span className="text-green-800 text-sm sm:text-base">
                {space.type === "custom" ? `Custom (${space.sqft} sq ft)` : space.type === "2-car" ? "2-Car Size" : space.type === "3-car" ? "3-Car Size" : "4-Car Size"}
              </span>
              <button onClick={() => removeAdditionalSpace(index)} className="text-red-600 hover:text-red-800 text-sm sm:text-base">
                Remove
              </button>
            </div>)}
          </div>
        </div>}
      </div>
    </div>
  );
};
