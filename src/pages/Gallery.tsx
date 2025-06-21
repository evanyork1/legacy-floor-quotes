
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  display_order: number;
  is_featured: boolean;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-xl text-gray-600 leading-relaxed">Explore our portfolio of premium floor coating installations.</p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Loading gallery...</div>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Photos Yet</h3>
              <p className="text-gray-500">Check back soon for our latest work!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <Card 
                  key={photo.id} 
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 overflow-hidden hover:-translate-y-2" 
                  onClick={() => setSelectedImage(photo)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img 
                        src={photo.image_url} 
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      {photo.is_featured && (
                        <div className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                          FEATURED
                        </div>
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <p className="font-semibold text-lg">{photo.title}</p>
                          <p className="text-xs opacity-75 mt-1">Click to expand</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for expanded image */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full h-auto p-0">
          <DialogTitle className="sr-only">
            {selectedImage?.title}
          </DialogTitle>
          <div className="relative">
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            {selectedImage && (
              <div className="relative">
                <img 
                  src={selectedImage.image_url} 
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-gray-300 text-sm">{selectedImage.description}</p>
                  )}
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
