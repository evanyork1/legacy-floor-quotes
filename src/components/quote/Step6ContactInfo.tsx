
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { FormData } from './types';

interface Step6Props {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}

interface ValidationErrors {
  name: string;
  phone: string;
  email: string;
  zipCode: string;
}

export const Step6ContactInfo = ({
  formData,
  updateFormData
}: Step6Props) => {
  const [errors, setErrors] = useState<ValidationErrors>({
    name: '',
    phone: '',
    email: '',
    zipCode: ''
  });

  const validatePhone = (phone: string): string => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      return 'Phone number must be exactly 10 digits';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.includes('@')) {
      return 'Please enter a valid email.';
    }
    return '';
  };

  const validateZipCode = (zipCode: string): string => {
    const digitsOnly = zipCode.replace(/\D/g, '');
    if (digitsOnly.length !== 5) {
      return 'ZIP code must be exactly 5 digits';
    }
    return '';
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    updateFormData(field, value);
    
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleFieldBlur = (field: keyof FormData, value: string) => {
    let error = '';
    
    switch (field) {
      case 'phone':
        error = validatePhone(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'zipCode':
        error = validateZipCode(value);
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your Quote Is On The Next Page!</h2>
        <p className="text-base sm:text-lg text-gray-600">Almost done! We just need your contact details</p>
      </div>

      <div className="max-w-xl mx-auto space-y-4 sm:space-y-6 px-4">
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="name" className="text-sm sm:text-base font-medium">Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={e => handleFieldChange('name', e.target.value)} 
              placeholder="Your full name" 
              className="mt-1 sm:mt-2 h-10 sm:h-12" 
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm sm:text-base font-medium">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone} 
              onChange={e => handleFieldChange('phone', e.target.value)}
              onBlur={e => handleFieldBlur('phone', e.target.value)}
              placeholder="(555) 123-4567" 
              className={`mt-1 sm:mt-2 h-10 sm:h-12 ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {errors.phone && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.phone}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-sm sm:text-base font-medium">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={e => handleFieldChange('email', e.target.value)}
            onBlur={e => handleFieldBlur('email', e.target.value)}
            placeholder="your.email@example.com" 
            className={`mt-1 sm:mt-2 h-10 sm:h-12 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          />
          {errors.email && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.email}</AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <Label htmlFor="zipCode" className="text-sm sm:text-base font-medium">ZIP Code</Label>
          <Input 
            id="zipCode" 
            value={formData.zipCode} 
            onChange={e => handleFieldChange('zipCode', e.target.value)}
            onBlur={e => handleFieldBlur('zipCode', e.target.value)}
            placeholder="12345" 
            className={`mt-1 sm:mt-2 h-10 sm:h-12 ${errors.zipCode ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          />
          {errors.zipCode && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.zipCode}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
