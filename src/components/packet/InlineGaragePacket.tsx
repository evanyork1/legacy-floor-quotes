import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { colorOptions } from '@/constants/colorOptions';
import { BeforeAfterSlider } from '@/components/visualizer/BeforeAfterSlider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

interface FormData {
  selectedColor: string;
  garageType: string;
  customSqft: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  visualizationUrl: string | null;
}

const BEFORE_IMAGE = '/demo-garage.jpg';

export const InlineGaragePacket = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    selectedColor: 'domino',
    garageType: '',
    customSqft: '',
    name: '',
    email: '',
    phone: '',
    zip: '',
    visualizationUrl: null,
  });

  const { data: pricingSettings } = useQuery({
    queryKey: ['location-pricing', 'DFW'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('location_pricing')
        .select('*')
        .eq('location', 'DFW')
        .single();
      if (error) throw error;
      return data;
    },
  });

  const garageOptions = [
    { id: 'custom', label: 'Know Exact Square Footage?', desc: 'Enter your exact size' },
    { id: '2-car', label: '2-Car Garage', desc: 'Approx. 400–450 sq ft' },
    { id: '3-car', label: '3-Car Garage', desc: 'Approx. 600–700 sq ft' },
    { id: '4-car', label: '4-Car Garage', desc: 'Approx. 800–1,000 sq ft' },
  ];

  const calculatePrice = () => {
    if (!pricingSettings) return 0;
    if (formData.garageType === '2-car') return pricingSettings.price_2_car;
    if (formData.garageType === '3-car') return pricingSettings.price_3_car;
    if (formData.garageType === '4-car') return pricingSettings.price_4_car;
    if (formData.garageType === 'custom' && formData.customSqft) {
      return parseInt(formData.customSqft) * pricingSettings.price_per_sqft;
    }
    return 0;
  };

  const selectedColorOption = colorOptions.find((c) => c.id === formData.selectedColor);
  const afterImage = selectedColorOption?.demoImage || '/demo-garage-domino.jpg';

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.zip) {
      toast.error('Please fill in all fields');
      return;
    }
    const zipDigits = formData.zip.replace(/\D/g, '');
    if (zipDigits.length !== 5) {
      toast.error('Please enter a valid 5-digit ZIP code');
      return;
    }

    setIsSubmitting(true);
    try {
      const estimatedPrice = calculatePrice();
      const custom_sqft = formData.garageType === 'custom' ? parseInt(formData.customSqft) : null;
      const { data, error } = await supabase.functions.invoke('public-floor-packet', {
        body: {
          action: 'create',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          garage_type: formData.garageType,
          custom_sqft,
          selected_color: formData.selectedColor,
          visualization_url: formData.visualizationUrl,
          estimated_price: estimatedPrice,
        },
      });
      if (error) throw error;
      if (!data?.id) throw new Error('No id returned');

      // Fire-and-forget Jobber sync — never block the user
      supabase.functions
        .invoke('jobber-quote-from-packet', {
          body: {
            action: 'create',
            packet_id: data.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            zip: zipDigits,
            garage_type: formData.garageType,
            custom_sqft,
            selected_color: formData.selectedColor,
            estimated_price: estimatedPrice,
          },
        })
        .then(({ error: jErr }) => {
          if (jErr) console.error('Jobber sync failed:', jErr);
        });

      toast.success('Your garage report is ready!');
      navigate(`/garage-packet-result/${data.id}`);
    } catch (error) {
      console.error('Error submitting:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedToStep2 = !!formData.selectedColor;
  const canProceedToStep3 = formData.garageType && (formData.garageType !== 'custom' || formData.customSqft);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Step header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {step > 1 && (
            <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          )}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s === step ? 'bg-blue-600 text-white' : s < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s < step ? <Check className="h-4 w-4" /> : s}
              </div>
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500 hidden sm:inline">Step {step} of 3</span>
      </div>

      <div className="p-4 sm:p-6">
        {step === 1 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Choose Your Floor Color</h2>
              <p className="text-sm sm:text-base text-gray-600">Select a color to preview</p>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-gray-100">
              <BeforeAfterSlider
                beforeImage={BEFORE_IMAGE}
                afterImage={afterImage}
                className="h-64 md:h-96"
              />
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setFormData((prev) => ({ ...prev, selectedColor: color.id }))}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    formData.selectedColor === color.id
                      ? 'border-blue-600 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={color.thumbnail}
                    alt={color.name}
                    className="w-full aspect-square object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5">
                    <p className="text-white text-[10px] font-medium truncate text-center">{color.name}</p>
                  </div>
                  {formData.selectedColor === color.id && (
                    <div className="absolute top-1 right-1 bg-blue-600 rounded-full p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!canProceedToStep2} className="bg-blue-600 hover:bg-blue-700">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">What size is your garage?</h2>
              <p className="text-sm sm:text-base text-gray-600">Choose the option that best describes your space</p>
            </div>

            <div className="grid gap-3 max-w-lg mx-auto">
              {garageOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData((prev) => ({ ...prev, garageType: option.id }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.garageType === option.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{option.label}</h3>
                      <p className="text-sm text-gray-500">{option.desc}</p>
                    </div>
                    {formData.garageType === option.id && <Check className="h-5 w-5 text-blue-600" />}
                  </div>
                </button>
              ))}
            </div>

            {formData.garageType === 'custom' && (
              <div className="max-w-lg mx-auto">
                <Label htmlFor="customSqft" className="font-medium mb-2 block">
                  Enter Square Footage
                </Label>
                <Input
                  id="customSqft"
                  type="number"
                  value={formData.customSqft}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customSqft: e.target.value }))}
                  placeholder="e.g. 500"
                  className="text-lg"
                />
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={() => setStep(3)} disabled={!canProceedToStep3} className="bg-blue-600 hover:bg-blue-700">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Report</h2>
              <p className="text-gray-600">Enter your info to receive your personalized garage quote</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div>
                <Label htmlFor="name" className="font-medium mb-2 block">Your Name</Label>
                <Input id="name" type="text" value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="John Smith" className="text-lg" />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium mb-2 block">Email Address</Label>
                <Input id="email" type="email" value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com" className="text-lg" />
              </div>
              <div>
                <Label htmlFor="phone" className="font-medium mb-2 block">Phone Number</Label>
                <Input id="phone" type="tel" value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="(214) 555-1234" className="text-lg" />
              </div>
              <div>
                <Label htmlFor="zip" className="font-medium mb-2 block">ZIP Code</Label>
                <Input id="zip" type="text" inputMode="numeric" maxLength={5} value={formData.zip}
                  onChange={(e) => setFormData((prev) => ({ ...prev, zip: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
                  placeholder="75201" className="text-lg" />
                <p className="mt-1 text-xs text-gray-500">We collect this for drive time estimations.</p>
              </div>
            </div>

            <div className="max-w-md mx-auto bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold mb-3">Your Quote Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium capitalize">{formData.selectedColor.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">
                    {formData.garageType === 'custom'
                      ? `${formData.customSqft} sq ft`
                      : garageOptions.find((o) => o.id === formData.garageType)?.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || formData.zip.length !== 5}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Your Report...
                  </>
                ) : (
                  <>See My Garage Price</>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Preload all demo color images so switching is instant */}
      <div aria-hidden="true" className="hidden">
        {colorOptions.map((c) => (
          <img key={c.id} src={c.demoImage} alt="" loading="eager" decoding="async" />
        ))}
      </div>
    </div>
  );
};
