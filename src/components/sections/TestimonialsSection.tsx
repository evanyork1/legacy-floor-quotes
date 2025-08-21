import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLocation } from "react-router-dom";
const TestimonialsSection = () => {
  const location = useLocation();
  const isProsper = location.pathname === '/epoxy-flooring-prosper';
  const isFrisco = location.pathname === '/epoxy-flooring-frisco';
  
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
    text: "I have nothing but great things to say about Legacy Industrial coating! From the first consultation to the actual Job. The people who work here are fantastic and so easy to work with! Would definitely recommend to anyone looking to get their floor coated. Definitely recommending to my family and friends. :)"
  }];
  return <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-slate-50" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 relative">
          {/* Yellow Reviews Badge - Fixed for mobile */}
          <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2 sm:-translate-y-4">
            
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-700">Google Reviews</span>
                <span className="text-xs text-gray-500">170+ five star reviews</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            {isProsper ? "What Homeowners Near Prosper Are Saying" : isFrisco ? "What Frisco Homeowners Are Saying" : "What Our Customers Say"}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Our customers love talking about the work we have done. Read from hundreds of customers their experience with us.
          </p>
        </div>
        
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
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
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
          {testimonials.map((testimonial, index) => <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30">
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