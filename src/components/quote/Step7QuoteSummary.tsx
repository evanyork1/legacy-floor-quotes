import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { FormData } from './types';

interface Step7Props {
  formData: FormData;
  estimatedPrice: number;
}

export const Step7QuoteSummary = ({ formData, estimatedPrice }: Step7Props) => {
  useEffect(() => {
    // Track quote request conversion when step 7 loads
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-410786005/2Ym5CI3Q7d0aENWx8MMB',
        'value': 1.0,
        'currency': 'USD'
      });
    }
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your Instant Quote</h2>
        <p className="text-base sm:text-lg text-gray-600">Here's your estimated price based on your selections</p>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
            <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3 sm:mb-4">
              ${estimatedPrice.toLocaleString()}
            </div>
            <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6">Estimated Total Investment</p>
            
            <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quote Summary:</h3>
              <div className="text-left space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Main Garage:</span>
                  <span className="font-medium">
                    {formData.garageType === "custom" ? `Custom (${formData.customSqft} sq ft)` : formData.garageType === "2-car" ? "2-Car Garage" : formData.garageType === "3-car" ? "3-Car Garage" : "4-Car Garage"}
                  </span>
                </div>
                {formData.additionalSpaces.map((space, index) => (
                  <div className="flex justify-between text-sm sm:text-base" key={index}>
                    <span>Additional Space #{index + 1}:</span>
                    <span className="font-medium">
                      {space.garageType === "custom" ? `Custom (${space.customSqft} sq ft)` : space.garageType === "2-car" ? "2-Car Garage" : space.garageType === "3-car" ? "3-Car Garage" : "4-Car Garage"}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Color Choice:</span>
                  <span className="font-medium capitalize">{formData.colorChoice.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Photos Uploaded:</span>
                  <span className="font-medium">{formData.exteriorPhotos.length + formData.damagePhotos.length} photos</span>
                </div>
              </div>
            </div>

            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-center">
              <h4 className="text-green-900 font-bold text-lg sm:text-xl mb-2">What's Next? 🔥</h4>
              <p className="text-green-800 text-base sm:text-lg">
                We'll call you within 60 minutes to confirm your quote and answer any questions!
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-yellow-800 text-sm font-medium mb-2">Important Disclaimer:</p>
              <p className="text-yellow-700 text-xs sm:text-sm text-left">
                This is not an exact estimate. Once our team member calls you, you will be issued an exact quote. 
                Things that may change pricing are significance of damage, moisture issues seen on photos, 
                existing coatings that need to be removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
