import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [{
    name: "Emily Carter",
    location: "Plano, TX",
    rating: 5,
    text: "Legacy made the whole process easy from start to finish. They handled everything, and my garage floor turned out amazing. The warranty gives me real peace of mind."
  }, {
    name: "Michael Tran",
    location: "Austin, TX",
    rating: 5,
    text: "What I liked most was that everything was handled by one team—no back and forth. The coating has held up great, even with all the wild Texas weather."
  }, {
    name: "Jessica Rivera",
    location: "Houston, TX",
    rating: 5,
    text: "Legacy took care of everything, which made things stress-free for us. Our patio floor looks incredible and was finished quickly and professionally."
  }, {
    name: "Daniel Lopez",
    location: "Phoenix, AZ",
    rating: 5,
    text: "The turnaround time was impressive—our floor was done in less than a week. It looks fantastic, and the whole process felt smooth and well-organized."
  }];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from homeowners who chose Legacy's full-service approach
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional installation image */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
            <img src="/lovable-uploads/49c586ed-2f38-4bb6-97fc-f42d1593a5c4.png" alt="Professional floor preparation and installation" className="relative w-full max-w-2xl mx-auto h-auto rounded-xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
