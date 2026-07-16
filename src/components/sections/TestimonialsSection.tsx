import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLocation } from "react-router-dom";
const TestimonialsSection = () => {
  const location = useLocation();
  const isProsper = location.pathname === '/epoxy-flooring-prosper';
  const isFrisco = location.pathname === '/epoxy-flooring-frisco';
  const isPHX = location.pathname === '/phx';
  const dfwTestimonials = [{
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
    text: "I have nothing but great things to say about Legacy Industrial coating! From the first consultation to the actual Job. The people who work here are fantastic and so easy to work with! Would definitely recommend to anyone looking to get their floor coated. Definitely recommending to my family and friends. :)"
  }];
  const phxTestimonials = [{
    name: "Sarah M.",
    location: "Scottsdale, AZ",
    rating: 5,
    text: "Legacy did an amazing job on our garage floor! The team was professional, showed up on time, and the finished product exceeded our expectations. Our Scottsdale neighbors have been asking for their contact info!"
  }, {
    name: "Mike R.",
    location: "Mesa, AZ",
    rating: 5,
    text: "Best decision we made for our home. The crew was friendly and efficient. Our garage looks incredible now and the floor is so easy to clean. Highly recommend to anyone in the Phoenix area!"
  }, {
    name: "Jennifer L.",
    location: "Tempe, AZ",
    rating: 5,
    text: "From quote to completion, everything was seamless. Great communication, fair pricing, and beautiful results. Our garage floor looks like something out of a magazine. Thank you Legacy!"
  }, {
    name: "David K.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "Outstanding work! The team was professional and completed the job quickly. The floor coating has held up perfectly through our hot Arizona summers. Worth every penny!"
  }];
  const testimonials = isPHX ? phxTestimonials : dfwTestimonials;
  return <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-slate-50" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6">
        
        
        {/* Featured Matthew Schultz Review */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
          <Card className="border border-blue-200 shadow-lg bg-white">
            <CardContent className="p-4 sm:p-6">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-bold text-gray-900 mr-2">Matthew Schultz</h3>
                </div>
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                  </div>
                  <span className="ml-2 text-xs text-gray-500">6 days ago</span>
                  <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                </div>
                <p className="text-gray-800 leading-relaxed text-sm">
                  Great communication, friendly service, excellent quality and a beautiful finished product. It is incredible how much better these floors make your garage look and feel. My wife said it made the garage feel like an extension of the house now. The team we interacted with was professional and it went from communication to completion. Easily one of the best (minor) investments we've made in our home.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 px-4">
          {testimonials.map((testimonial, index) => <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 bg-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed italic text-sm sm:text-base">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;