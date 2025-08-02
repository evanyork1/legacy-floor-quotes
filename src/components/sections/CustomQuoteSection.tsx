import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CustomQuoteSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Prefer to customize it yourself?
          </h3>
          <p className="text-gray-600 mb-6">
            Get an instant quote tailored to your specific needs with our quick tool.
          </p>
          <Button
            onClick={() => navigate('/quotedfw')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Try our 90-second Instant Quote Tool
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};