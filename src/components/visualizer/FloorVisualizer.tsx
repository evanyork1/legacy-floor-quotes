import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, Loader2 } from 'lucide-react';
import { ColorOption } from '@/components/quote/ColorOption';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { colorOptions } from '@/constants/colorOptions';
import { applyFloorTexture, loadImageFromFile, loadImageFromUrl } from '@/lib/floorOverlay';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const FloorVisualizer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error loading image:', error);
      toast.error('Failed to load image');
    }
  };

  const handleVisualize = async () => {
    if (!uploadedImage || !selectedColor) {
      toast.error('Please upload an image and select a color');
      return;
    }

    setIsProcessing(true);

    try {
      const colorOption = colorOptions.find(c => c.id === selectedColor);
      if (!colorOption?.preview) {
        throw new Error('Color preview not available');
      }

      const baseImage = await loadImageFromUrl(uploadedImage);
      const textureImage = await loadImageFromUrl(colorOption.preview);

      const result = await applyFloorTexture(baseImage, textureImage, {
        blendMode: 'multiply',
        opacity: 0.65,
        brightness: 1.1
      });

      setTransformedImage(result);
      toast.success('Transformation complete!');
    } catch (error) {
      console.error('Error applying texture:', error);
      toast.error('Failed to transform image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!transformedImage) return;

    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = 'floor-visualization.jpg';
    link.click();
    toast.success('Image downloaded!');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedColor(null);
    setTransformedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          See Your Floor Transformed
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload a photo of your garage floor and visualize it with our premium epoxy colors
        </p>
      </div>

      {/* Upload Section */}
      {!uploadedImage ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Floor Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <label
              htmlFor="floor-upload"
              className={cn(
                "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer",
                "hover:bg-accent/50 transition-colors",
                "border-border bg-card"
              )}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
              </div>
              <input
                id="floor-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </label>
            
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Tips for best results:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Take photo from the doorway for full floor view</li>
                <li>• Ensure good lighting (natural light works best)</li>
                <li>• Clean the floor surface if possible</li>
                <li>• Hold camera/phone steady and level</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Color Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {colorOptions.map((color) => (
                  <ColorOption
                    key={color.id}
                    color={color}
                    isSelected={selectedColor === color.id}
                    onSelect={setSelectedColor}
                    onPreview={() => {}}
                  />
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleVisualize}
                  disabled={!selectedColor || isProcessing}
                  className="flex-1"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Visualize'
                  )}
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Result Section */}
          {transformedImage ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Transformed Floor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <BeforeAfterSlider
                  beforeImage={uploadedImage}
                  afterImage={transformedImage}
                />
                
                <div className="flex gap-3">
                  <Button onClick={handleDownload} variant="default" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/garagelandinginstant'} 
                    variant="secondary"
                    className="flex-1"
                  >
                    Get a Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : uploadedImage && !isProcessing && (
            <Card>
              <CardContent className="pt-6">
                <img
                  src={uploadedImage}
                  alt="Uploaded floor"
                  className="w-full rounded-lg"
                />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
