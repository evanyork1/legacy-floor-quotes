
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [{
    name: "Bharat Arimilli",
    location: "Plano, TX",
    rating: 5,
    text: "Excellent experience from start to finish. Got a quote quickly and at a very reasonable price. The office was very communicative throughout and the crew did an amazing job with the final result. This team is full of people who are professional, friendly and great at what they do."
  }, {
    name: "Scott Cleland",
    location: "Dallas, TX",
    rating: 5,
    text: "Totally exceeded my expectations. Crew was experienced and professional. They worked with me on how to address existing cracks in my floor, and they worked around some challenging weather. Finished floor is amazing."
  }, {
    name: "Chris C",
    location: "Melissa, TX",
    rating: 5,
    text: "Great company to work with. Competent, genuinely helpful staff. From the original quote to the completion of the job, the representatives were always thorough and professional. Would highly recommend Legacy Industrial Epoxy Floor Coating to anyone seeking this service."
  }, {
    name: "Joseph Im",
    location: "McKinney, TX",
    rating: 5,
    text: "I have nothing but great things to say about Legacy Industrial coating! From the first consultation to the actual Job. The people who work here are fantastic and so easy to work with! Would definitely recommend to anyone looking to get their garage floor coated. Definitely recommending to my family and friends. :)"
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
