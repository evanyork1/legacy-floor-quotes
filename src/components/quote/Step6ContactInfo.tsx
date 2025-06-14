
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormData } from './types';

interface Step6Props {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}

export const Step6ContactInfo = ({ formData, updateFormData }: Step6Props) => (
  <div className="space-y-6 sm:space-y-8">
    <div className="text-center mb-8 sm:mb-12 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your Information</h2>
      <p className="text-base sm:text-lg text-gray-600">Almost done! We just need your contact details</p>
    </div>

    <div className="max-w-xl mx-auto space-y-4 sm:space-y-6 px-4">
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <Label htmlFor="name" className="text-sm sm:text-base font-medium">Name</Label>
          <Input id="name" value={formData.name} onChange={e => updateFormData('name', e.target.value)} placeholder="Your full name" className="mt-1 sm:mt-2 h-10 sm:h-12" />
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm sm:text-base font-medium">Phone Number</Label>
          <Input id="phone" type="tel" value={formData.phone} onChange={e => updateFormData('phone', e.target.value)} placeholder="(555) 123-4567" className="mt-1 sm:mt-2 h-10 sm:h-12" />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-sm sm:text-base font-medium">Email Address</Label>
        <Input id="email" type="email" value={formData.email} onChange={e => updateFormData('email', e.target.value)} placeholder="your.email@example.com" className="mt-1 sm:mt-2 h-10 sm:h-12" />
      </div>

      <div>
        <Label htmlFor="zipCode" className="text-sm sm:text-base font-medium">ZIP Code</Label>
        <Input id="zipCode" value={formData.zipCode} onChange={e => updateFormData('zipCode', e.target.value)} placeholder="12345" className="mt-1 sm:mt-2 h-10 sm:h-12" />
      </div>
    </div>
  </div>
);
