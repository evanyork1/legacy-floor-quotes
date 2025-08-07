import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Users, Award, Clock, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Family Foundation",
      description: "Started as a family business, we've grown while maintaining our personal touch and commitment to every customer."
    },
    {
      icon: Award,
      title: "Skilled Workmanship",
      description: "Our experienced team delivers professional installations that exceed industry standards every time."
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "We respect your time and complete projects efficiently without compromising on quality."
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description: "We don't install cheap floors. Every project uses premium materials and proven techniques."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We start with understanding your needs and providing expert guidance on the best solutions for your space.",
      image: "/lovable-uploads/4a736b12-2872-4f73-9c03-1fe5a79358d9.png"
    },
    {
      step: "02", 
      title: "Professional Preparation",
      description: "Our skilled team prepares your surface using state-of-the-art equipment and proven techniques.",
      image: "/lovable-uploads/f51e2674-703e-41e2-af60-3230aa51f8fe.png"
    },
    {
      step: "03",
      title: "Expert Installation", 
      description: "We apply premium coatings with precision and attention to detail, ensuring a flawless finish.",
      image: "/lovable-uploads/0fd4e444-b540-4c31-b624-49d7b2cb00a6.png"
    },
    {
      step: "04",
      title: "Quality Assurance",
      description: "Every project undergoes thorough inspection to ensure it meets our high standards and your expectations.",
      image: "/lovable-uploads/7d71c2b1-b5e5-4bd4-9e4d-427a3d20283f.png"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Legacy Industrial Coatings - Your Trusted Dallas-Fort Worth Floor Coating Experts</title>
        <meta name="description" content="Learn about Legacy Industrial Coatings, a family-owned company that has grown to be a recognized leader in epoxy floor coatings across Dallas-Fort Worth. Discover our mission of providing exceptional customer service and premium quality installations." />
        <meta name="keywords" content="about legacy industrial coatings, family business, dallas fort worth epoxy, floor coating company, professional installation" />
      </Helmet>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  From Family Business to
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"> Regional Leader</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Legacy Industrial Coatings started as a family company and has grown to be a recognized brand across Dallas-Fort Worth, built on skilled workmanship, professionalism, and an unwavering commitment to quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                    <div className="text-gray-600">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <OptimizedImage
                  src="/lovable-uploads/998d8e69-d5c2-455a-9074-40a5cd13c2a0.png"
                  alt="Legacy Industrial Coatings professional team working on a large commercial floor coating project"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-sm text-gray-600 mb-1">Serving</div>
                  <div className="text-lg font-bold text-gray-900">Dallas-Fort Worth</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                To provide perfect customer support from the first meeting to the finished product. We believe in doing things right the first time, using premium materials and expert craftsmanship to deliver floors that last a lifetime.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Professional Process
              </h2>
              <p className="text-xl text-gray-600">
                From consultation to completion, we ensure every step meets our high standards of excellence.
              </p>
            </div>

            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-4">
                      <span className="text-4xl font-bold text-blue-600 mr-4">{step.step}</span>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <OptimizedImage
                      src={step.image}
                      alt={`Legacy Industrial Coatings ${step.title.toLowerCase()} process`}
                      className="rounded-lg shadow-lg w-full h-80 object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Why Dallas-Fort Worth Trusts Legacy
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our skilled workmanship and professionalism separate us from the competition. We're not installing cheap floors – our mission is to provide perfect customer support and premium quality installations that stand the test of time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Premium materials and advanced coating systems</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Experienced, professional installation team</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Comprehensive warranty protection</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">Local company with regional expertise</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <OptimizedImage
                  src="/lovable-uploads/5818f249-f4d8-4a09-b3cf-0434ccff0e29.png"
                  alt="Legacy Industrial Coatings commercial installation showcasing professional workmanship"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Experience the Legacy Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers across Dallas-Fort Worth who trust Legacy for their floor coating needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/quotedfw" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
              >
                Get Free Quote
              </a>
              <a 
                href="tel:214-305-6516" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                Call (214) 305-6516
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;