import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, Loader2, Wand2, RotateCcw } from 'lucide-react';
import { ColorOption } from '@/components/quote/ColorOption';
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

  const handleVisualize = async () => {
    if (!uploadedImage || !selectedColor) {
      toast.error('Please upload an image and select a color');
      return;
    }

    if (!leadCaptured && aiEnhancementsUsed >= 3) {
      setShowLeadModal(true);
      return;
    }

    setIsProcessing(true);
    try {
      const selectedColorOption = colorOptions.find(c => c.id === selectedColor);
      if (!selectedColorOption) {
        toast.error('Selected color not found');
        return;
      }

      const mask = await generateFloorMask(uploadedImage);

      const { data, error } = await supabase.functions.invoke('visualize-floor', {
        body: {
          image: uploadedImage,
          colorName: selectedColorOption.name,
          mask: mask
        }
      });

      if (error) {
        console.error('Visualization error:', error);
        throw error;
      }

      if (data?.visualizedImage) {
        setTransformedImage(data.visualizedImage);
        toast.success('Realistic visualization created!');
        
        const newCount = aiEnhancementsUsed + 1;
        setAiEnhancementsUsed(newCount);
        localStorage.setItem('fv_ai_used', newCount.toString());
      } else {
        throw new Error('No visualization returned');
      }
    } catch (error) {
      console.error('Error creating visualization:', error);
      toast.error('Failed to create visualization. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!transformedImage) return;
    
    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = 'floor-visualization.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setTransformedImage(null);
    setSelectedColor(null);
  };

  const handleLeadCapture = (email: string, name: string) => {
    console.log('Lead captured:', { email, name });
    localStorage.setItem('fv_lead_captured', 'true');
    setLeadCaptured(true);
    setShowLeadModal(false);
    toast.success('Thank you! You now have unlimited visualizations.');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Floor Visualizer</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload a photo of your space and see how different epoxy colors would look with AI-powered realistic visualization
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Space</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="floor-upload"
                />
                <label htmlFor="floor-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </label>
              </div>

              {uploadedImage && (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={uploadedImage}
                    alt="Uploaded space"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colorOptions.map((color) => (
                  <ColorOption
                    key={color.id}
                    color={color}
                    isSelected={selectedColor === color.id}
                    onSelect={() => setSelectedColor(color.id)}
                    onPreview={() => {}}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleVisualize}
              disabled={isProcessing || !uploadedImage || !selectedColor}
              size="lg"
              className="w-full gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Visualization...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Visualize ({leadCaptured ? 'Unlimited' : `${3 - aiEnhancementsUsed} Free`})
                </>
              )}
            </Button>

            {isProcessing && (
              <p className="text-sm text-muted-foreground text-center animate-pulse">
                Creating realistic visualization (10-20 seconds)...
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Visualization</CardTitle>
                {transformedImage && (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!uploadedImage && (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Upload an image to get started</p>
                </div>
              )}

              {uploadedImage && !transformedImage && (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Select a color and click Visualize
                  </p>
                </div>
              )}

              {uploadedImage && transformedImage && (
                <BeforeAfterSlider
                  beforeImage={uploadedImage}
                  afterImage={transformedImage}
                />
              )}
            </CardContent>
          </Card>
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
