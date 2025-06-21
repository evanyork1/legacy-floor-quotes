
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Image as ImageIcon } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder gallery items - these will be replaced with actual photos
  const galleryItems = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    category: i % 4 === 0 ? "Commercial" : i % 3 === 0 ? "Residential" : i % 2 === 0 ? "Industrial" : "Garage",
    description: "Premium floor coating installation"
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Work <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our portfolio of premium floor coating installations across Dallas-Fort Worth and Houston
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <Card 
                key={item.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 overflow-hidden hover:-translate-y-2"
                onClick={() => setSelectedImage(item.id)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {/* Placeholder content */}
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 font-medium">{item.title}</p>
                      <p className="text-gray-400 text-sm">{item.category}</p>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="font-semibold text-lg">{item.title}</p>
                        <p className="text-sm opacity-90">{item.description}</p>
                        <p className="text-xs opacity-75 mt-1">Click to expand</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for expanded image */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full h-auto p-0">
          <DialogTitle className="sr-only">
            Gallery Image {selectedImage}
          </DialogTitle>
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            {selectedImage && (
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <ImageIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">
                    Project {selectedImage}
                  </h3>
                  <p className="text-gray-500">
                    High-resolution photo will be displayed here
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Upload your project photos to showcase your work
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
