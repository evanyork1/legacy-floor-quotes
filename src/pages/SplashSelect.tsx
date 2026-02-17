import { useNavigate } from "react-router-dom";

const SplashSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        {/* Logo */}
        <img
          src="/lovable-uploads/a18e3648-17a6-4222-808b-0a78d3ea50b9.png"
          alt="Legacy Industrial Coatings"
          className="h-20 sm:h-28 md:h-32 w-auto mb-8"
        />

        {/* Tagline */}
        <p className="text-gray-400 text-sm sm:text-base tracking-[0.25em] uppercase mb-12 text-center">
          Premium Floor Coatings
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg">
          <button
            onClick={() => navigate("/dfw")}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-lg sm:text-xl font-semibold py-5 px-10 rounded-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-[0.98]"
          >
            Residential
          </button>
          <button
            onClick={() => navigate("/commercialfloors")}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-lg sm:text-xl font-semibold py-5 px-10 rounded-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-[0.98]"
          >
            Commercial
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashSelect;
