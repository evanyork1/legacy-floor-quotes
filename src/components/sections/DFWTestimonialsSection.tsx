import { Star } from "lucide-react";
const DFWTestimonialsSection = () => {
  const reviews = [{
    name: "Bharat Arimilli",
    timeAgo: "3 weeks ago",
    rating: 5,
    text: "Excellent service and quality work. The team was professional and completed the job on time. Highly recommended for epoxy flooring in the DFW area.",
    avatar: "BA"
  }, {
    name: "Scott Cleland",
    timeAgo: "2 months ago",
    rating: 5,
    text: "Outstanding results! The garage floor looks amazing and the lifetime warranty gives me peace of mind. Great communication throughout the process.",
    avatar: "SC"
  }, {
    name: "Chris C",
    timeAgo: "4 months ago",
    rating: 5,
    text: "Top-notch work from start to finish. The team was punctual, clean, and delivered exactly what they promised. Couldn't be happier with the results.",
    avatar: "CC"
  }, {
    name: "Chris B",
    timeAgo: "6 days ago",
    rating: 5,
    text: "Just had my garage floor done and it exceeded expectations. Fast turnaround and incredible attention to detail. Worth every penny!",
    avatar: "CB"
  }, {
    name: "Rovin Mathew",
    timeAgo: "5 months ago",
    rating: 5,
    text: "Professional installation and beautiful finish. The team explained everything clearly and cleaned up perfectly. Highly recommend their services.",
    avatar: "RM"
  }];
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our DFW Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Over 170 5 star reviews.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.timeAgo}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                "{review.text}"
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default DFWTestimonialsSection;