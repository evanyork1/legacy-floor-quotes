
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import type { FormData } from './types';

interface Step2Props {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}

export const Step2CustomSpace = ({ formData, updateFormData }: Step2Props) => (
  <div className="space-y-4 sm:space-y-6">
    <div className="text-center mb-4 sm:mb-6 px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Tell us about your custom space</h2>
      <p className="text-sm sm:text-base text-gray-600">Help us calculate the perfect quote for you</p>
    </div>

    <div className="max-w-xl mx-auto space-y-3 sm:space-y-4 px-4">
      <div>
        <Label htmlFor="sqft" className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 block">What's your total square footage?</Label>
        <div className="relative">
          <Input id="sqft" type="number" inputMode="decimal" pattern="[0-9]*" value={formData.customSqft} onChange={e => updateFormData('customSqft', e.target.value)} placeholder="Enter square footage" className="h-10 sm:h-12 text-base sm:text-lg font-semibold text-center bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 hover:shadow placeholder:text-blue-400" />
          <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-blue-500 font-medium text-sm sm:text-base">
            sq ft
          </div>
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <p className="text-xs sm:text-sm text-blue-600 mt-1.5 text-center font-medium">
          ✨ The more accurate, the better your quote!
        </p>
      </div>

      <div>
        <Label className="text-sm sm:text-base font-medium mb-2 sm:mb-3 block">What type of space is this?</Label>
        <div className="grid gap-2">
          {[{ id: "garage-floor", label: "Garage Floor" }, { id: "storage", label: "Extra storage" }, { id: "warehouse", label: "Warehouse" }, { id: "detached", label: "Detached garage" }, { id: "other", label: "Other" }].map(option => <button key={option.id} onClick={() => updateFormData('spaceType', option.id)} className={`p-2.5 sm:p-3 rounded-lg border-2 text-left transition-all ${formData.spaceType === option.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{option.label}</span>
              {formData.spaceType === option.id && <Check className="h-4 w-4 text-blue-600" />}
            </div>
          </button>)}
        </div>

        {formData.spaceType === "other" && <Input value={formData.otherSpaceType} onChange={e => updateFormData('otherSpaceType', e.target.value)} placeholder="Please describe your space" className="mt-2 h-9" />}
      </div>
    </div>
  </div>
);
