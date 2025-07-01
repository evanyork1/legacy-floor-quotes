
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
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

export const FloorVisualizer = () => {
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
      {/* Upload Section */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <div className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            
            {!uploadedImage ? (
              <div className="space-y-4">
                <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Garage Photo</h3>
                  <p className="text-gray-600 mb-4">
                    Take a photo of your garage floor and see it transformed
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    Choose Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded garage"
                  className="max-w-full h-64 object-contain mx-auto rounded-lg"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Photo
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Color Selection */}
      {uploadedImage && (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Choose Your Color</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorOptions.map(color => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedColor === color.id ? 'border-blue-600 shadow-lg' : 'border-gray-200'
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
              <div className="text-center mt-6">
                <Button
                  onClick={handleVisualize}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating Visualization...
                    </>
                  ) : (
                    "Visualize My Floor"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Visualization Result */}
      {visualizedImage && (
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Your Transformed Floor</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-center">Before</h4>
                <img
                  src={uploadedImage}
                  alt="Original garage"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 className="font-medium mb-2 text-center">After</h4>
                <img
                  src={visualizedImage}
                  alt="Visualized garage"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
