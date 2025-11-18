import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, Loader2, Wand2, RotateCcw, Send } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { VisualizerQuoteModal } from './VisualizerQuoteModal';
import { LeadFormModal } from '@/components/landing/LeadFormModal';
import { CountdownTimer } from './CountdownTimer';
import { RotatingFacts } from './RotatingFacts';
import { ShareModal } from './ShareModal';
import { colorOptions } from '@/constants/colorOptions';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
export const FloorVisualizer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>("domino");
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiEnhancementsUsed, setAiEnhancementsUsed] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoadingDemo, setIsLoadingDemo] = useState(true);
  const [isUsingDemoPhoto, setIsUsingDemoPhoto] = useState(true);
  // Preview URLs for iOS Safari stability (display only)
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string | null>(null);
  const [transformedPreviewUrl, setTransformedPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    const used = parseInt(localStorage.getItem('fv_ai_used') || '0', 10);
    setAiEnhancementsUsed(used);
  }, []);

  // Auto-load demo photo and pre-visualized Domino on mount
  useEffect(() => {
    const loadDemoPhoto = async () => {
      try {
        const [originalResponse, dominoResponse] = await Promise.all([fetch('/demo-garage.jpg'), fetch('/demo-garage-domino.jpg')]);

        // Process original demo photo
        const originalBlob = await originalResponse.blob();
        const originalFile = new File([originalBlob], 'demo-garage.jpg', {
          type: 'image/jpeg'
        });
        const resizedOriginal = await resizeImage(originalFile);

        // Process pre-visualized Domino image
        const dominoBlob = await dominoResponse.blob();
        const dominoFile = new File([dominoBlob], 'demo-garage-domino.jpg', {
          type: 'image/jpeg'
        });
        const resizedDomino = await resizeImage(dominoFile);

        // Create preview URLs
        const originalUrl = URL.createObjectURL(originalBlob);
        const dominoUrl = URL.createObjectURL(dominoBlob);

        // Set all states simultaneously to prevent flash
        setUploadedPreviewUrl(originalUrl);
        setUploadedImage(resizedOriginal);
        setTransformedPreviewUrl(dominoUrl);
        setTransformedImage(resizedDomino);
        setIsInitialLoad(false);
        setIsLoadingDemo(false);
      } catch (error) {
        console.error('Error loading demo visualization:', error);
        setIsInitialLoad(false);
        setIsLoadingDemo(false);
      }
    };
    loadDemoPhoto();
  }, []);
  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          console.log('Original image dimensions:', {
            width,
            height
          });
          if (width > MAX_WIDTH) {
            height = height * MAX_WIDTH / width;
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
          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.9);
          console.log('Resized image dimensions:', {
            width,
            height
          });
          resolve(resizedBase64);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };
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
      // Revoke previous preview URLs to avoid memory leaks
      if (uploadedPreviewUrl) {
        URL.revokeObjectURL(uploadedPreviewUrl);
      }
      if (transformedPreviewUrl) {
        URL.revokeObjectURL(transformedPreviewUrl);
        setTransformedPreviewUrl(null);
      }
      setTransformedImage(null);

      // Create a lightweight preview URL for Safari/iOS stability (for display only)
      const objectUrl = URL.createObjectURL(file);
      setUploadedPreviewUrl(objectUrl);

      // Resize the image for API processing (fixes iOS mask mismatch issues)
      toast.info('Resizing image for optimal processing...');
      const resizedBase64 = await resizeImage(file);
      setUploadedImage(resizedBase64);
      setIsUsingDemoPhoto(false);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error loading image:', error);
      toast.error('Failed to load image. Please try again.');
    }
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
  const handleVisualize = async (overrideColorId?: string) => {
    if (!uploadedImage || !(overrideColorId || selectedColor)) {
      toast.error('Please upload an image and select a color');
      return;
    }
    setIsProcessing(true);
    try {
      const colorIdToUse = overrideColorId || selectedColor!;
      console.log('Starting visualization with resized image');
      const selectedColorOption = colorOptions.find(c => c.id === colorIdToUse);
      if (!selectedColorOption) {
        toast.error('Selected color not found');
        setIsProcessing(false);
        return;
      }
      const mask = await generateFloorMask(uploadedImage);
      console.log('Generated mask for resized image');
      const {
        data,
        error
      } = await supabase.functions.invoke('visualize-floor', {
        body: {
          image: uploadedImage,
          colorName: selectedColorOption.name,
          colorId: selectedColorOption.id,
          mask: mask
        }
      });
      if (error) {
        console.error('Visualization error:', error);
        toast.error('Failed to visualize floor. Please try a different photo or color.');
        setIsProcessing(false);
        return;
      }
      if (!data?.visualizedImage) {
        console.error('No visualized image in response:', data);
        toast.error('Visualization failed. Please try a different photo.');
        setIsProcessing(false);
        return;
      }
      console.log('Successfully received transformed image');
      if (data?.visualizedImage) {
        setTransformedImage(data.visualizedImage);
        // Create a stable preview URL for iOS Safari
        try {
          const res = await fetch(data.visualizedImage);
          const blob = await res.blob();
          if (transformedPreviewUrl) URL.revokeObjectURL(transformedPreviewUrl);
          const afterUrl = URL.createObjectURL(blob);
          setTransformedPreviewUrl(afterUrl);
        } catch (e) {
          console.error('Preview URL error:', e);
          setTransformedPreviewUrl(null);
        }
        toast.success('Floor visualization complete!');
        const newCount = aiEnhancementsUsed + 1;
        setAiEnhancementsUsed(newCount);
        localStorage.setItem('fv_ai_used', newCount.toString());
        if (newCount >= 3) {
          setTimeout(() => setShowQuoteModal(true), 500);
        }
      } else {
        console.error('No visualized image returned');
        toast.error('Failed to generate visualization. Please try again.');
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
  const handleReset = async () => {
    if (uploadedPreviewUrl) URL.revokeObjectURL(uploadedPreviewUrl);
    if (transformedPreviewUrl) URL.revokeObjectURL(transformedPreviewUrl);
    setUploadedPreviewUrl(null);
    setTransformedPreviewUrl(null);
    setUploadedImage(null);
    setSelectedColor("domino");
    setTransformedImage(null);
    setIsUsingDemoPhoto(true);
    setAiEnhancementsUsed(0);
    localStorage.setItem('fv_ai_used', '0');

    // Reload demo photo
    try {
      const [originalResponse, dominoResponse] = await Promise.all([fetch('/demo-garage.jpg'), fetch('/demo-garage-domino.jpg')]);
      const originalBlob = await originalResponse.blob();
      const originalFile = new File([originalBlob], 'demo-garage.jpg', {
        type: 'image/jpeg'
      });
      const resizedOriginal = await resizeImage(originalFile);
      const dominoBlob = await dominoResponse.blob();
      const dominoFile = new File([dominoBlob], 'demo-garage-domino.jpg', {
        type: 'image/jpeg'
      });
      const resizedDomino = await resizeImage(dominoFile);
      const originalUrl = URL.createObjectURL(originalBlob);
      const dominoUrl = URL.createObjectURL(dominoBlob);
      setUploadedPreviewUrl(originalUrl);
      setUploadedImage(resizedOriginal);
      setTransformedPreviewUrl(dominoUrl);
      setTransformedImage(resizedDomino);
    } catch (error) {
      console.error('Error reloading demo:', error);
    }
    toast.success('Visualizer reset');
  };
  return <div className="w-full">
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

      {/* Before/After Example Section */}
      
      {isLoadingDemo ? <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-navy-600 mx-auto mb-4" />
              <p className="text-navy-600 font-medium">Loading visualizer...</p>
            </div>
          </div>
        </div> : <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[400px,1fr] gap-6 md:gap-8">
          {/* Left Column - Upload & Colors */}
          <div className="space-y-6">
            {/* Upload Card */}
            <Card className="border-navy-200">
              <CardHeader className="bg-navy-50/50">
                <CardTitle className="flex items-center gap-2 text-navy-900">Upload Your Own Garage                       <Upload className="h-5 w-5 text-navy-600" />
                  Step 1: Upload Your Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border-2 border-dashed border-navy-300 rounded-lg p-4 text-center hover:border-navy-500 hover:bg-navy-50/30 transition-all">
                  <input type="file" id="floor-upload" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  <label htmlFor="floor-upload" className="cursor-pointer flex flex-col items-center gap-3">
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
                      {uploadedImage && <p className="text-xs text-green-600 font-medium mt-2">
                          ✓ Photo uploaded successfully
                        </p>}
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            {uploadedImage && <Card className="border-navy-200">
                <CardHeader className="bg-navy-50/50">
                  <CardTitle className="flex items-center gap-2 text-navy-900">
                    <Wand2 className="h-5 w-5 text-navy-600" />
                    Step 2: Choose Your Color
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                    {colorOptions.map(color => <div key={color.id} onClick={async () => {
                  setSelectedColor(color.id);

                  // If using demo photo, instantly load pre-rendered image
                  if (isUsingDemoPhoto && color.demoImage) {
                    try {
                      const response = await fetch(color.demoImage);
                      const blob = await response.blob();
                      const file = new File([blob], `demo-garage-${color.id}.jpg`, {
                        type: 'image/jpeg'
                      });
                      const resized = await resizeImage(file);
                      if (transformedPreviewUrl) URL.revokeObjectURL(transformedPreviewUrl);
                      const previewUrl = URL.createObjectURL(blob);
                      setTransformedImage(resized);
                      setTransformedPreviewUrl(previewUrl);
                    } catch (error) {
                      console.error('Error loading demo image:', error);
                      toast.error('Failed to load demo visualization');
                    }
                  } else if (!isUsingDemoPhoto && uploadedImage && !isProcessing) {
                    // User uploaded their own photo, trigger AI
                    handleVisualize(color.id);
                  }
                }} className={`cursor-pointer p-3 rounded-lg border-2 transition-all hover:scale-105 ${selectedColor === color.id ? 'border-navy-600 shadow-lg bg-navy-50' : 'border-navy-200 hover:border-navy-400'}`}>
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-lg overflow-hidden mb-2">
                            <img src={color.thumbnail} alt={color.name} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <p className="text-sm font-medium text-navy-900 text-center">
                            {color.name}
                          </p>
                        </div>
                        {selectedColor === color.id && <div className="mt-2 flex justify-center">
                            <div className="w-6 h-6 bg-navy-600 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </div>}
                      </div>)}
                  </div>
                  
                  {selectedColor && <div className="mt-6 pt-6 border-t border-navy-200">
                      <Button type="button" size="lg" onClick={e => {
                  e.preventDefault();
                  handleVisualize();
                }} disabled={isProcessing} className="w-full bg-navy-600 hover:bg-navy-700 text-white">
                      {isProcessing ? <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating your visualization...
                        </> : <>
                          <Wand2 className="mr-2 h-5 w-5" />
                          Visualize My Floor
                        </>}
                    </Button>
                  </div>}
                </CardContent>
              </Card>}
          </div>

          {/* Right Column - Visualization Result */}
          <div>
            <Card className="border-navy-200 sticky top-4 relative">
              <CardHeader className="bg-navy-50/50">
                <CardTitle className="flex items-center justify-between text-navy-900">
                  <span>Your Garage</span>
                  {transformedPreviewUrl || transformedImage}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {!uploadedImage ? <div className="min-h-[500px] md:min-h-[600px] bg-navy-50 rounded-lg flex flex-col items-center justify-center text-center p-6 md:p-8">
                    <div className="p-4 bg-navy-100 rounded-full mb-4">
                      <Wand2 className="h-12 w-12 text-navy-400" />
                    </div>
                    <p className="text-navy-600 font-medium mb-2">
                      No image uploaded yet
                    </p>
                    <p className="text-sm text-navy-500">
                      Upload a photo to get started
                    </p>
                  </div> : transformedPreviewUrl || transformedImage ? <div className="space-y-4">
                    <BeforeAfterSlider beforeImage={(uploadedPreviewUrl || uploadedImage)!} afterImage={(transformedPreviewUrl || transformedImage)!} className="rounded-lg overflow-hidden min-h-[500px] md:min-h-[600px]" />
                    <p className="text-sm text-navy-600 text-center">
                      👆 Drag the slider to compare before and after
                    </p>
                  </div> : <div className="space-y-4">
                    <div className="min-h-[500px] md:min-h-[600px] rounded-lg overflow-hidden flex items-center justify-center bg-navy-50">
                      <img src={uploadedPreviewUrl || uploadedImage || ''} alt="Your uploaded floor" className="w-full h-full object-contain bg-navy-50" loading="eager" />
                    </div>
                    <p className="text-sm text-navy-600 text-center">
                      Select a color and click "Visualize My Floor" to see the transformation
                    </p>
                  </div>}
              </CardContent>

              {/* Get My Quote Button */}
              {(transformedPreviewUrl || transformedImage) && <div className="px-6 pb-6">
                  <div className="max-w-md mx-auto space-y-3">
                    <Button size="lg" onClick={() => setShowQuoteModal(true)} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-lg font-semibold">
                      Get My Quote
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setShowShareModal(true)} className="w-full border-navy-300 text-navy-700 hover:bg-navy-50 py-6 text-lg font-semibold">
                      <Send className="mr-2 h-5 w-5" />
                      Share
                    </Button>
                  </div>
                </div>}

              {isProcessing && uploadedImage && <div className="absolute inset-0 z-10 flex items-center justify-center bg-navy-900/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center text-white">
                    <CountdownTimer duration={60} onComplete={() => {
                  toast.error('Visualization is taking longer than expected. Please try again.');
                  setIsProcessing(false);
                }} />
                    <RotatingFacts />
                  </div>
                </div>}
            </Card>
          </div>
        </div>
      </div>}

      {/* Quote Modal */}
      <VisualizerQuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} onSuccess={() => {
      setShowQuoteModal(false);
      setShowSuccessModal(true);
    }} />

      {/* Success/Thank You Modal */}
      <LeadFormModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

      {/* Share Modal */}
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} onDownload={handleDownload} transformedImage={transformedImage || ''} />
    </div>;
};