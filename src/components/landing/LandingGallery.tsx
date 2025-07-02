
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { X } from "lucide-react";

export const LandingGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Your actual gallery images
  const galleryImages = [
    {
      id: 1,
      src: "/lovable-uploads/5e144751-0c9d-4d92-85c2-5cf59fe90395.png",
      alt: "Concrete samples with speckled epoxy coating finish"
    },
    {
      id: 2,
      src: "/lovable-uploads/008e4edb-0e9b-4952-8a51-b7d92f110955.png",
      alt: "Garage with beautiful speckled epoxy floor coating"
    },
    {
      id: 3,
      src: "/lovable-uploads/de857ed2-571d-46fc-a514-07461bffbb2b.png",
      alt: "Motorcycle on professionally coated garage floor"
    },
    {
      id: 4,
      src: "/lovable-uploads/e57c7675-310f-4345-ba29-137d7f5b6fc2.png",
      alt: "Large garage with premium speckled epoxy coating"
    },
    {
      id: 5,
      src: "/lovable-uploads/05270bc2-aa1f-4fef-a93c-d32cc53c7cac.png",
      alt: "Clean garage with high-quality epoxy floor finish"
    },
    {
      id: 6,
      src: "/lovable-uploads/b8222828-654c-4fc9-bb15-998130521ad4.png",
      alt: "Garage floor with durable speckled coating"
    },
    {
      id: 7,
      src: "/lovable-uploads/e97d8dd3-11e7-4aea-89c2-f0a89c4229c4.png",
      alt: "Spacious garage with professional epoxy coating"
    },
    {
      id: 8,
      src: "/lovable-uploads/afa49718-8e01-4090-bf6e-4e50dd95630c.png",
      alt: "BMW on premium speckled garage floor"
    },
    {
      id: 9,
      src: "/lovable-uploads/624693af-bec7-4554-be4d-134ef392147c.png",
      alt: "Sports cars on high-end garage floor coating"
    }
  ];

  const openImage = (src: string) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {galleryImages.map((image) => (
          <Card 
            key={image.id} 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => openImage(image.src)}
          >
            <CardContent className="p-0">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeImage}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImage}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            <img
              src={selectedImage}
              alt="Expanded gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};
