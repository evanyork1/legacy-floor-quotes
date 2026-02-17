import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CommercialFloors = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4 text-center">
        Commercial Floors
      </h1>
      <p className="text-gray-400 text-lg sm:text-xl mb-10 text-center max-w-md">
        Something big is coming. Stay tuned.
      </p>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
    </div>
  );
};

export default CommercialFloors;
