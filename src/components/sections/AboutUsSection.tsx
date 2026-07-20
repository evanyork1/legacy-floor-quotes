export const AboutUsSection = () => {
  return (
    <>
      {/* Craftsmanship Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Skilled Workmanship You Can See
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Our team brings years of experience and genuine pride to every project, whether it's a residential garage or a large commercial space.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/f51e2674-703e-41e2-af60-3230aa51f8fe.png" 
                alt="Legacy craftsman carefully preparing garage floor surface with professional equipment" 
                className="rounded-lg shadow-lg w-full h-64 object-cover" 
               loading="eager" decoding="async" />
              <h3 className="text-xl font-semibold text-gray-900">Meticulous Preparation</h3>
              <p className="text-gray-600">Every surface gets the attention it deserves. We take time to properly prepare each floor for the best possible result.</p>
            </div>

            <div className="space-y-4">
              <img 
                src="/lovable-uploads/0fd4e444-b540-4c31-b624-49d7b2cb00a6.png" 
                alt="Legacy professional applying premium floor coating with precision and care" 
                className="rounded-lg shadow-lg w-full h-64 object-cover" 
               loading="eager" decoding="async" />
              <h3 className="text-xl font-semibold text-gray-900">Precision Application</h3>
              <p className="text-gray-600">Our skilled team applies every coating with care and precision, ensuring an even, beautiful finish that lasts.</p>
            </div>

            <div className="space-y-4">
              <img 
                src="/lovable-uploads/7d71c2b1-b5e5-4bd4-9e4d-427a3d20283f.png" 
                alt="Legacy team member working in residential garage with professional floor coating equipment" 
                className="rounded-lg shadow-lg w-full h-64 object-cover" 
               loading="eager" decoding="async" />
              <h3 className="text-xl font-semibold text-gray-900">Attention to Detail</h3>
              <p className="text-gray-600">Whether residential or commercial, every project gets the same level of care and professional attention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Large Project Showcase */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                From Garages to Commercial Spaces
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                No project is too big or too small for Legacy. We bring the same level of professionalism and commitment whether we're coating a residential garage or a massive commercial facility.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                What sets us apart isn't just our skill – it's our commitment to every single floor. We don't just show up and do a job. We take pride in our work, and it shows in the results.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Professional equipment and techniques</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Skilled, experienced team members</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Commitment to quality over speed</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <img 
                src="/lovable-uploads/998d8e69-d5c2-455a-9074-40a5cd13c2a0.png" 
                alt="Legacy team working on large commercial floor coating project with professional results" 
                className="rounded-lg shadow-lg w-full h-auto" 
               loading="eager" decoding="async" />
              <img 
                src="/lovable-uploads/5818f249-f4d8-4a09-b3cf-0434ccff0e29.png" 
                alt="Commercial installation showcasing Legacy's professional capabilities and attention to detail" 
                className="rounded-lg shadow-lg w-full h-auto" 
               loading="eager" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              What Makes Legacy Different
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
              We're not the fastest or the cheapest. We're the ones who care about getting it right. Every floor we work on is a reflection of our reputation, and we take that seriously.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-left">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">We Take Our Time</h3>
                <p className="text-gray-600">Quality work can't be rushed. We give every project the time it needs to be done right.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">We Care About Details</h3>
                <p className="text-gray-600">From surface prep to final inspection, we pay attention to the details that make the difference.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">We Stand Behind Our Work</h3>
                <p className="text-gray-600">When you choose Legacy, you're choosing a company that will be here for you long after the job is done.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
