
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Image } from "lucide-react";

interface PhotoViewerProps {
  exteriorPhotos: string[] | null;
  damagePhotos: string[] | null;
}

const PhotoViewer = ({ exteriorPhotos, damagePhotos }: PhotoViewerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const allPhotos = [
    ...(exteriorPhotos || []),
    ...(damagePhotos || [])
  ];

  if (allPhotos.length === 0) {
    return (
      <span className="text-gray-500 text-sm">No photos</span>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
          <Eye className="h-4 w-4 mr-1" />
          View ({allPhotos.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Quote Photos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {exteriorPhotos && exteriorPhotos.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Exterior Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {exteriorPhotos.map((photo, index) => (
                  <div 
                    key={index}
                    className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <img 
                      src={photo} 
                      alt={`Exterior ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {damagePhotos && damagePhotos.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Damage Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {damagePhotos.map((photo, index) => (
                  <div 
                    key={index}
                    className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <img 
                      src={photo} 
                      alt={`Damage ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedImage && (
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Photo Preview</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                  <img 
                    src={selectedImage} 
                    alt="Full size preview"
                    className="max-w-full max-h-[70vh] object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoViewer;
