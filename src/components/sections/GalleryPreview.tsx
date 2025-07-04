
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GalleryPreview = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Photos in the same order as they appear on the gallery page
  const previewImages = [
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
    }
  ];

  const openImage = (src: string) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            See Our Latest Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the quality and craftsmanship that goes into every installation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {previewImages.map((image) => (
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

        <div className="text-center">
          <Button 
            onClick={() => navigate('/gallery')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            See More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
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
    </section>
  );
};

export default GalleryPreview;
