import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, Loader2, Wand2, RotateCcw } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { LeadCaptureModal } from './LeadCaptureModal';
import { colorOptions } from '@/constants/colorOptions';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const FloorVisualizer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiEnhancementsUsed, setAiEnhancementsUsed] = useState(0);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  useEffect(() => {
    const used = parseInt(localStorage.getItem('fv_ai_used') || '0', 10);
    const captured = localStorage.getItem('fv_lead_captured') === 'true';
    setAiEnhancementsUsed(used);
    setLeadCaptured(captured);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setTransformedImage(null);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error loading image:', error);
      toast.error('Failed to load image');
    }
  };

  const generateFloorMask = async (imageDataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
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

  const handleVisualize = async (overrideColorId?: string) => {
    if (!uploadedImage || !(overrideColorId || selectedColor)) {
      toast.error('Please upload an image and select a color');
      return;
    }

    setIsProcessing(true);
    try {
      const colorIdToUse = overrideColorId || selectedColor!;
      const selectedColorOption = colorOptions.find(c => c.id === colorIdToUse);
      if (!selectedColorOption) {
        toast.error('Selected color not found');
        return;
      }

      const mask = await generateFloorMask(uploadedImage);

      const { data, error } = await supabase.functions.invoke('visualize-floor', {
        body: {
          image: uploadedImage,
          colorName: selectedColorOption.name,
          colorId: selectedColorOption.id,
          mask: mask
        }
      });

      if (error) {
        console.error('Visualization error:', error);
        toast.error('Failed to visualize floor. Please try again.');
        return;
      }

      if (data?.visualizedImage) {
        setTransformedImage(data.visualizedImage);
        toast.success('Floor visualization complete!');

        const newCount = aiEnhancementsUsed + 1;
        setAiEnhancementsUsed(newCount);
        localStorage.setItem('fv_ai_used', newCount.toString());

        if (!leadCaptured && newCount >= 3) {
          setTimeout(() => setShowLeadModal(true), 500);
        }
      }
    } catch (error) {
      console.error('Error during visualization:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!transformedImage) return;
    
    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = 'floor-visualization.png';
    link.click();
    toast.success('Image downloaded!');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedColor(null);
    setTransformedImage(null);
    toast.success('Visualizer reset');
  };

  const handleLeadCapture = () => {
    setLeadCaptured(true);
    localStorage.setItem('fv_lead_captured', 'true');
    setShowLeadModal(false);
    toast.success('Thank you! You now have unlimited visualizations.');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Visualize Your Dream Floor
          </h1>
          <p className="text-lg md:text-xl text-navy-100 max-w-2xl mx-auto">
            Upload a photo of your space and instantly see how different epoxy colors transform your floor
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[400px,1fr] gap-6 md:gap-8">
          {/* Left Column - Upload & Colors */}
          <div className="space-y-6">
            {/* Upload Card */}
            <Card className="border-navy-200">
              <CardHeader className="bg-navy-50/50">
                <CardTitle className="flex items-center gap-2 text-navy-900">
                  <Upload className="h-5 w-5 text-navy-600" />
                  Step 1: Upload Your Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border-2 border-dashed border-navy-300 rounded-lg p-4 text-center hover:border-navy-500 hover:bg-navy-50/30 transition-all">
                  <input
                    type="file"
                    id="floor-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="floor-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <div className="p-3 bg-navy-100 rounded-full">
                      <Upload className="h-6 w-6 text-navy-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm md:text-base font-medium text-navy-900">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-navy-600">
                        PNG, JPG up to 5MB
                      </p>
                      {uploadedImage && (
                        <p className="text-xs text-green-600 font-medium mt-2">
                          ✓ Photo uploaded successfully
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            {uploadedImage && (
              <Card className="border-navy-200">
                <CardHeader className="bg-navy-50/50">
                  <CardTitle className="flex items-center gap-2 text-navy-900">
                    <Wand2 className="h-5 w-5 text-navy-600" />
                    Step 2: Choose Your Color
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                    {colorOptions.map((color) => (
                      <div
                        key={color.id}
                        onClick={() => {
                          setSelectedColor(color.id)
                          if (uploadedImage && transformedImage && !isProcessing) {
                            handleVisualize(color.id)
                          }
                        }}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedColor === color.id
                            ? 'border-navy-600 shadow-lg bg-navy-50'
                            : 'border-navy-200 hover:border-navy-400'
                        }`}
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden mb-2">
                          <img
                            src={color.thumbnail}
                            alt={color.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-medium text-navy-900 text-center">
                          {color.name}
                        </p>
                        {selectedColor === color.id && (
                          <div className="mt-2 flex justify-center">
                            <div className="w-6 h-6 bg-navy-600 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {selectedColor && (
                    <div className="mt-6 pt-6 border-t border-navy-200">
                      <Button
                        size="lg"
                        onClick={handleVisualize}
                        disabled={isProcessing}
                        className="w-full bg-navy-600 hover:bg-navy-700 text-white"
                      >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating your visualization...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-5 w-5" />
                          Visualize My Floor
                        </>
                      )}
                    </Button>
                  </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Visualization Result */}
          <div>
            <Card className="border-navy-200 sticky top-4 relative">
              <CardHeader className="bg-navy-50/50">
                <CardTitle className="flex items-center justify-between text-navy-900">
                  <span>Your Visualization</span>
                  {transformedImage && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        className="border-navy-300 text-navy-700 hover:bg-navy-50"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="border-navy-300 text-navy-700 hover:bg-navy-50"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Reset</span>
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {!uploadedImage ? (
                  <div className="min-h-[500px] md:min-h-[600px] bg-navy-50 rounded-lg flex flex-col items-center justify-center text-center p-6 md:p-8">
                    <div className="p-4 bg-navy-100 rounded-full mb-4">
                      <Wand2 className="h-12 w-12 text-navy-400" />
                    </div>
                    <p className="text-navy-600 font-medium mb-2">
                      No image uploaded yet
                    </p>
                    <p className="text-sm text-navy-500">
                      Upload a photo to get started
                    </p>
                  </div>
                ) : transformedImage ? (
                  <div className="space-y-4">
                    <BeforeAfterSlider
                      beforeImage={uploadedImage}
                      afterImage={transformedImage}
                      className="rounded-lg overflow-hidden min-h-[500px] md:min-h-[600px]"
                    />
                    <p className="text-sm text-navy-600 text-center">
                      👆 Drag the slider to compare before and after
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="min-h-[500px] md:min-h-[600px] rounded-lg overflow-hidden flex items-center justify-center bg-navy-50">
                      <img
                        src={uploadedImage}
                        alt="Your uploaded floor"
                        className="w-full h-full object-contain bg-navy-50"
                      />
                    </div>
                    <p className="text-sm text-navy-600 text-center">
                      Select a color and click "Visualize My Floor" to see the transformation
                    </p>
                  </div>
                )}
              </CardContent>
              {isProcessing && uploadedImage && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-navy-900/70 backdrop-blur-sm">
                  <div className="flex flex-col items-center text-white">
                    <Loader2 className="h-10 w-10 animate-spin mb-3" />
                    <p className="text-sm">Generating your floor visualization...</p>
                    <p className="text-xs text-white/80 mt-1">This usually takes 10–20 seconds</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={handleLeadCapture}
      />
    </div>
  );
};
