import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Check, Loader2, Upload, X } from 'lucide-react';
import { colorOptions } from '@/constants/colorOptions';
import { BeforeAfterSlider } from '@/components/visualizer/BeforeAfterSlider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

interface GaragePacketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  selectedColor: string;
  garageType: string;
  customSqft: string;
  name: string;
  email: string;
  phone: string;
  visualizationUrl: string | null;
}

export const GaragePacketModal = ({ isOpen, onClose }: GaragePacketModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUsingDemoPhoto, setIsUsingDemoPhoto] = useState(true);
  
  const [formData, setFormData] = useState<FormData>({
    selectedColor: 'domino',
    garageType: '',
    customSqft: '',
    name: '',
    email: '',
    phone: '',
    visualizationUrl: null,
  });

  // Fetch pricing from database
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
    { id: "custom", label: "Know Exact Square Footage?", desc: "Enter your exact size" },
    { id: "2-car", label: "2-Car Garage", desc: "Approx. 400–450 sq ft" },
    { id: "3-car", label: "3-Car Garage", desc: "Approx. 600–700 sq ft" },
    { id: "4-car", label: "4-Car Garage", desc: "Approx. 800–1,000 sq ft" },
  ];

  // Calculate price based on selection
  const calculatePrice = () => {
    if (!pricingSettings) return 0;
    if (formData.garageType === "2-car") return pricingSettings.price_2_car;
    if (formData.garageType === "3-car") return pricingSettings.price_3_car;
    if (formData.garageType === "4-car") return pricingSettings.price_4_car;
    if (formData.garageType === "custom" && formData.customSqft) {
      return parseInt(formData.customSqft) * pricingSettings.price_per_sqft;
    }
    return 0;
  };

  // Load demo images on mount
  useEffect(() => {
    const loadDemoImages = async () => {
      try {
        const selectedColorOption = colorOptions.find(c => c.id === formData.selectedColor);
        const demoImagePath = selectedColorOption?.demoImage || '/demo-garage-domino.jpg';
        
        const [originalResponse, colorResponse] = await Promise.all([
          fetch('/demo-garage.jpg'),
          fetch(demoImagePath)
        ]);
        
        const originalBlob = await originalResponse.blob();
        const colorBlob = await colorResponse.blob();
        
        setUploadedImage(URL.createObjectURL(originalBlob));
        setTransformedImage(URL.createObjectURL(colorBlob));
        setIsLoadingDemo(false);
      } catch (error) {
        console.error('Error loading demo images:', error);
        setIsLoadingDemo(false);
      }
    };
    
    if (isOpen) {
      loadDemoImages();
    }
  }, [isOpen]);

  // Update demo image when color changes (only for demo photos)
  useEffect(() => {
    if (!isUsingDemoPhoto || !isOpen) return;
    
    const updateDemoColor = async () => {
      const selectedColorOption = colorOptions.find(c => c.id === formData.selectedColor);
      if (selectedColorOption?.demoImage) {
        try {
          const response = await fetch(selectedColorOption.demoImage);
          const blob = await response.blob();
          setTransformedImage(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error loading color demo:', error);
        }
      }
    };
    
    updateDemoColor();
  }, [formData.selectedColor, isUsingDemoPhoto, isOpen]);

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const generateFloorMask = async (imageDataUrl: string): Promise<string> => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve('');
          return;
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const floorStartY = canvas.height * 0.5;
        const gradient = ctx.createLinearGradient(0, floorStartY, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, floorStartY, canvas.width, canvas.height - floorStartY);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = imageDataUrl;
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }
    
    try {
      setIsProcessing(true);
      const objectUrl = URL.createObjectURL(file);
      setUploadedImage(objectUrl);
      setIsUsingDemoPhoto(false);
      
      toast.info('Processing your photo with AI...');
      
      const resizedBase64 = await resizeImage(file);
      const selectedColorOption = colorOptions.find(c => c.id === formData.selectedColor);
      const mask = await generateFloorMask(resizedBase64);
      
      const { data, error } = await supabase.functions.invoke('visualize-floor', {
        body: {
          image: resizedBase64,
          colorName: selectedColorOption?.name || 'Domino',
          colorId: formData.selectedColor,
          mask
        }
      });
      
      if (error) throw error;
      
      if (data?.visualizedImage) {
        setTransformedImage(data.visualizedImage);
        setFormData(prev => ({ ...prev, visualizationUrl: data.visualizedImage }));
        toast.success('AI visualization complete!');
      } else {
        toast.error('Failed to visualize. Please try again.');
      }
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all contact fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const estimatedPrice = calculatePrice();
      
      const { data, error } = await supabase.functions.invoke('public-floor-packet', {
        body: {
          action: 'create',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          garage_type: formData.garageType,
          custom_sqft: formData.garageType === 'custom' ? parseInt(formData.customSqft) : null,
          selected_color: formData.selectedColor,
          visualization_url: formData.visualizationUrl,
          estimated_price: estimatedPrice,
        },
      });

      if (error) throw error;
      if (!data?.id) throw new Error('No id returned');

      // Trigger the floor packet webhook (non-blocking)
      supabase.functions.invoke('send-floor-packet-webhook', {
        body: {
          id: data.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          garage_type: formData.garageType,
          custom_sqft: formData.garageType === 'custom' ? parseInt(formData.customSqft) : null,
          selected_color: formData.selectedColor,
          estimated_price: estimatedPrice,
          visualization_url: formData.visualizationUrl,
        }
      }).then(({ error: webhookError }) => {
        if (webhookError) {
          console.error('Error triggering floor packet webhook:', webhookError);
        } else {
          console.log('Floor packet webhook triggered successfully');
        }
      });

      toast.success('Your garage report is ready!');
      onClose();
      navigate(`/garage-packet-result/${data.id}`);
    } catch (error) {
      console.error('Error submitting:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedToStep2 = formData.selectedColor && (uploadedImage || transformedImage);
  const canProceedToStep3 = formData.garageType && (formData.garageType !== 'custom' || formData.customSqft);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Get Your Garage Price</DialogTitle>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center justify-between">
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
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Step 1: Color Visualizer */}
          {step === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Choose Your Floor Color</h2>
                <p className="text-sm sm:text-base text-gray-600">Select a color to preview, or upload your own garage photo</p>
              </div>

              {/* Before/After Slider */}
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                {isLoadingDemo ? (
                  <div className="h-64 md:h-96 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : isProcessing ? (
                  <div className="h-64 md:h-96 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">AI is processing your photo...</p>
                  </div>
                ) : uploadedImage && transformedImage ? (
                  <BeforeAfterSlider
                    beforeImage={uploadedImage}
                    afterImage={transformedImage}
                    className="h-64 md:h-96"
                  />
                ) : (
                  <div className="h-64 md:h-96 flex items-center justify-center">
                    <p className="text-gray-500">Loading preview...</p>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div className="flex justify-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isProcessing}
                  />
                  <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                    <Upload className="h-5 w-5" />
                    <span className="font-medium">Upload Your Own Garage Photo</span>
                  </div>
                </label>
              </div>

              {/* Color Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setFormData(prev => ({ ...prev, selectedColor: color.id }))}
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
                     loading="lazy" decoding="async" />
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
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Size Selection */}
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
                    onClick={() => setFormData(prev => ({ ...prev, garageType: option.id }))}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.garageType === option.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{option.label}</h3>
                        <p className="text-sm text-gray-500">{option.desc}</p>
                      </div>
                      {formData.garageType === option.id && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, customSqft: e.target.value }))}
                    placeholder="e.g. 500"
                    className="text-lg"
                  />
                </div>
              )}


              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Report</h2>
                <p className="text-gray-600">Enter your info to receive your personalized garage quote</p>
              </div>

              {/* Prominent Text Message Notice */}
              <div className="max-w-md mx-auto bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-semibold text-lg">We'll only text you about your quote</span>
                </div>
                <p className="text-blue-600 text-sm mt-1">No spam, no sales calls — just your personalized report</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <Label htmlFor="name" className="font-medium mb-2 block">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Smith"
                    className="text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-medium mb-2 block">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-medium mb-2 block">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(214) 555-1234"
                    className="text-lg"
                  />
                </div>
              </div>

              {/* Summary - without pricing */}
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
                        : garageOptions.find(o => o.id === formData.garageType)?.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Your Report...
                    </>
                  ) : (
                    <>Get My Free Report</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
