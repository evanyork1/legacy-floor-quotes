
import { Card, CardContent } from "@/components/ui/card";

export const LandingGallery = () => {
  // Placeholder images - these can be replaced with actual gallery images
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      alt: "Modern garage floor coating with metallic finish",
      title: "Metallic Epoxy Finish"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop",
      alt: "Clean concrete floor with protective coating",
      title: "Industrial Grade Coating"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop",
      alt: "Decorative garage floor with flake system",
      title: "Decorative Flake System"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=600&fit=crop",
      alt: "High-performance garage floor coating",
      title: "Performance Coating"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop",
      alt: "Seamless garage floor finish",
      title: "Seamless Finish"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      alt: "Professional garage transformation",
      title: "Complete Transformation"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {galleryImages.map((image) => (
        <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-0">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-center">{image.title}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
