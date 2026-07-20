import { useNavigate } from "react-router-dom";

const GiveawayHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center h-16 sm:h-20 md:h-28">
          {/* Logo - Centered */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/dfw')}>
            <img 
              src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png" 
              alt="Legacy Industrial Coatings" 
              className="h-12 sm:h-16 md:h-19 lg:h-22 w-auto" 
             loading="eager" decoding="async" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GiveawayHeader;
