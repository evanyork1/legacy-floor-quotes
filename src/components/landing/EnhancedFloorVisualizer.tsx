
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Loader2, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const colorOptions = [
  { id: "domino", name: "Domino", thumbnail: "/lovable-uploads/cdfd7176-3906-43b6-94ee-714cbd1826a4.png" },
  { id: "tidal-wave", name: "Tidal Wave", thumbnail: "/lovable-uploads/ee1820a2-913b-461d-b3fb-92cbd844fd78.png" },
  { id: "wombat", name: "Wombat", thumbnail: "/lovable-uploads/2546c208-cda6-4d48-9163-80c246dba2d2.png" },
  { id: "raven", name: "Raven", thumbnail: "/lovable-uploads/348c8c3b-1396-4bef-ab42-e8412ddbee0c.png" },
  { id: "cabin-fever", name: "Cabin Fever", thumbnail: "/lovable-uploads/735e5c66-d9b6-4902-9d1a-fd1deea7b369.png" },
  { id: "coyote", name: "Coyote", thumbnail: "/lovable-uploads/7ad5601d-c765-4bd8-9777-db2ad54404eb.png" },
  { id: "creek-bed", name: "Creek Bed", thumbnail: "/lovable-uploads/30880d71-5ddb-4653-8b75-4f05283e8728.png" },
  { id: "orbit", name: "Orbit", thumbnail: "/lovable-uploads/77dbbade-9254-4af6-872f-f75c0f6f9607.png" }
];

export const EnhancedFloorVisualizer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [visualizedImage, setVisualizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setVisualizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVisualize = async () => {
    if (!uploadedImage || !selectedColor) {
      toast({
        title: "Missing information",
        description: "Please upload an image and select a color",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const selectedColorData = colorOptions.find(c => c.id === selectedColor);
      
      const { data, error } = await supabase.functions.invoke('visualize-floor', {
        body: {
          image: uploadedImage,
          colorName: selectedColorData?.name || selectedColor,
          colorThumbnail: selectedColorData?.thumbnail
        }
      });

      if (error) throw error;

      if (data?.visualizedImage) {
        setVisualizedImage(data.visualizedImage);
        toast({
          title: "Visualization Complete!",
          description: "Your floor has been transformed with the selected color",
        });
      }
    } catch (error) {
      console.error('Visualization error:', error);
      toast({
        title: "Visualization Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Step 1: Upload Section */}
      <Card className="border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Upload a Photo of Your Garage</h3>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            
            {!uploadedImage ? (
              <div className="space-y-6">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 mb-6 text-lg">
                    Upload a photo of your garage here to see how it will look with our premium coatings
                  </p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded garage"
                  className="max-w-full h-64 object-contain mx-auto rounded-lg shadow-md"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  Change Photo
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Color Selection */}
      {uploadedImage && (
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Choose Your Color</h3>
              </div>
              <p className="text-gray-600">Select the perfect color for your garage floor coating</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorOptions.map(color => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedColor === color.id ? 'border-blue-600 shadow-lg ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                >
                  <div className="w-full h-16 rounded-lg mb-2 overflow-hidden">
                    <img
                      src={color.thumbnail}
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-medium text-sm">{color.name}</p>
                </button>
              ))}
            </div>
            
            {selectedColor && (
              <div className="text-center mt-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">See Your Transformation</h3>
                </div>
                <Button
                  onClick={handleVisualize}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Creating Your Visualization...
                    </>
                  ) : (
                    "See Your Floor Transformed!"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Visualization Result */}
      {visualizedImage && (
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Garage Floor Transformation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-center text-lg">Before</h4>
                <img
                  src={uploadedImage}
                  alt="Original garage"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-center text-lg">After</h4>
                <img
                  src={visualizedImage}
                  alt="Visualized garage"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Love what you see? Get your personalized quote below!</p>
              <Button
                onClick={() => {
                  const element = document.getElementById('quote-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
              >
                Get My Quote Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
