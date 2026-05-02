import { useNavigate } from "react-router-dom";
import legacyLogo from "@/assets/legacy-logo-white.png";

const SplashSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden select-none">
      {/* Subtle ambient */}

      {/* Thin horizontal rule accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />

      <div className="relative z-10 flex flex-col items-center splash-entrance">
        {/* Logo */}
        <img
          src={legacyLogo}
          alt="Legacy Industrial Coatings"
          className="w-64 sm:w-80 md:w-96 mb-6"
        loading="eager" decoding="async" fetchpriority="high" />

        {/* Divider */}
        <div className="w-16 h-[1px] bg-blue-600/40 mb-6" />

        {/* Tagline */}
        <p className="text-gray-300 text-sm sm:text-base tracking-[0.3em] uppercase mb-14 sm:mb-16 text-center font-light">
          Premium Floor Coatings and Polishing
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full max-w-sm sm:max-w-md">
          <button
            onClick={() => navigate("/dfw")}
            className="flex-1 border border-blue-500/60 bg-blue-600/10 backdrop-blur-sm text-white text-sm sm:text-base font-medium tracking-widest uppercase py-4 px-8 rounded transition-all duration-300 hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] active:scale-[0.97]"
          >
            Residential
          </button>
          <button
            onClick={() => navigate("/commercialfloors")}
            className="flex-1 border border-blue-500/60 bg-blue-600/10 backdrop-blur-sm text-white text-sm sm:text-base font-medium tracking-widest uppercase py-4 px-8 rounded transition-all duration-300 hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] active:scale-[0.97]"
          >
            Commercial
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

      <style>{`
        @keyframes splash-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .splash-entrance {
          animation: splash-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashSelect;
