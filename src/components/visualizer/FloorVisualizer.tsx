import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, Loader2, Zap, Sparkles, RotateCcw } from 'lucide-react';
import { ColorOption } from '@/components/quote/ColorOption';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { LeadCaptureModal } from './LeadCaptureModal';
import { colorOptions } from '@/constants/colorOptions';
import { applyFloorTexture, loadImageFromFile } from '@/lib/floorOverlay';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

export const FloorVisualizer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isAiEnhanced, setIsAiEnhanced] = useState(false);
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

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    try {
      const img = await loadImageFromFile(file);
      setUploadedImage(img.src);
      setTransformedImage(null);
      setIsAiEnhanced(false);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error loading image:', error);
      toast.error('Failed to load image');
    }
  };

  const generateFloorMask = (img: HTMLImageElement): string => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Fill with black (preserve)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create gradient mask for bottom ~50% of image (floor area)
    const floorStartY = canvas.height * 0.5;
    const gradient = ctx.createLinearGradient(0, floorStartY, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, floorStartY, canvas.width, canvas.height - floorStartY);

    return canvas.toDataURL('image/png');
  };

  const handleVisualize = async () => {
    if (!uploadedImage || !selectedColor) {
      toast.error('Please upload an image and select a color');
      return;
    }

    setIsProcessing(true);
    setIsAiEnhanced(false);
    try {
      const selectedColorOption = colorOptions.find(c => c.id === selectedColor);
      if (!selectedColorOption) {
        toast.error('Selected color not found');
        return;
      }

      const img = new Image();
      img.src = uploadedImage;
      await new Promise((resolve) => { img.onload = resolve; });

      const textureImg = new Image();
      textureImg.src = selectedColorOption.thumbnail;
      await new Promise((resolve) => { textureImg.onload = resolve; });

      const result = await applyFloorTexture(img, textureImg);
      setTransformedImage(result);
      toast.success('Quick preview ready! Try "Enhance with AI" for photorealism.');
    } catch (error) {
      console.error('Preview error:', error);
      toast.error('Failed to generate preview');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEnhanceWithAI = async () => {
    if (!uploadedImage || !selectedColor) {
      toast.error('Please upload an image and select a color');
      return;
    }

    // Check usage limits
    if (!leadCaptured && aiEnhancementsUsed >= 3) {
      setShowLeadModal(true);
      return;
    }

    setIsAiProcessing(true);
    try {
      const selectedColorOption = colorOptions.find(c => c.id === selectedColor);
      if (!selectedColorOption) {
        toast.error('Selected color not found');
        return;
      }

      const img = new Image();
      img.src = uploadedImage;
      await new Promise((resolve) => { img.onload = resolve; });

      const mask = generateFloorMask(img);

      toast.info('Creating realistic visualization (10-20s)...');

      const { data, error } = await supabase.functions.invoke('visualize-floor', {
        body: { 
          image: uploadedImage, 
          colorName: selectedColorOption.name,
          mask 
        }
      });

      if (error) throw error;

      if (data?.visualizedImage) {
        setTransformedImage(data.visualizedImage);
        setIsAiEnhanced(true);
        const newUsed = aiEnhancementsUsed + 1;
        setAiEnhancementsUsed(newUsed);
        localStorage.setItem('fv_ai_used', newUsed.toString());
        toast.success('AI-enhanced visualization complete!');
      } else {
        throw new Error('No result from AI');
      }
    } catch (error) {
      console.error('AI enhancement error:', error);
      toast.error('AI enhancement failed. Please try again or use quick preview.');
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleLeadSubmit = (email: string, name: string) => {
    console.log('Lead captured:', { email, name });
    localStorage.setItem('fv_lead_captured', 'true');
    setLeadCaptured(true);
    setShowLeadModal(false);
    toast.success('Thanks! You now have unlimited AI enhancements.');
  };

  const handleDownload = () => {
    if (!transformedImage) return;
    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = `floor-visualization-${isAiEnhanced ? 'ai-enhanced' : 'preview'}.png`;
    link.click();
    toast.success('Image downloaded!');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedColor(null);
    setTransformedImage(null);
    setIsAiEnhanced(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
          Visualize Your Dream Floor
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload a photo of your space and see how different epoxy colors would look.
          Get an instant preview or use AI for photorealistic results.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload & Color Selection */}
        <div className="space-y-6">
          {/* Upload Card */}
          {!uploadedImage ? (
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Space</CardTitle>
              </CardHeader>
              <CardContent>
                <label className={cn(
                  "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                  "border-border hover:border-primary bg-card hover:bg-accent"
                )}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Your Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded space"
                  className="w-full h-auto rounded-lg"
                />
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Upload Different Image
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Color Selection */}
          {uploadedImage && (
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Color</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {colorOptions.map((color) => (
                    <ColorOption
                      key={color.id}
                      color={color}
                      isSelected={selectedColor === color.id}
                      onSelect={(colorId) => setSelectedColor(colorId)}
                      onPreview={() => {}}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {uploadedImage && selectedColor && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleVisualize}
                      disabled={isProcessing || isAiProcessing}
                      variant="outline"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Quick Preview
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleEnhanceWithAI}
                      disabled={isProcessing || isAiProcessing}
                      size="lg"
                    >
                      {isAiProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Enhance with AI
                        </>
                      )}
                    </Button>
                  </div>
                  {!leadCaptured && (
                    <p className="text-xs text-muted-foreground text-center">
                      {aiEnhancementsUsed}/3 free AI enhancements used
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Result Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transformedImage && (
                <div className="space-y-4">
                  {isAiEnhanced && (
                    <div className="flex items-center justify-center gap-2 text-sm text-primary">
                      <Zap className="h-4 w-4" />
                      <span className="font-medium">AI-Enhanced Realistic Result</span>
                    </div>
                  )}
                  <BeforeAfterSlider
                    beforeImage={uploadedImage!}
                    afterImage={transformedImage}
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/quote'}
                      className="flex-1"
                    >
                      Get Quote
                    </Button>
                  </div>
                </div>
              )}
              {!transformedImage && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                  <p>Upload an image and select a color to see your preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={handleLeadSubmit}
      />
    </div>
  );
};
