import { CTAButton } from "@/components/ui/cta-button";
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
          <CTAButton
            onClick={() => navigate('/quotedfw')}
            variant="primary"
            size="md"
            icon={<ArrowRight />}
            iconPosition="right"
            fullWidthMobile={true}
          >
            Try our 90-second Instant Quote Tool
          </CTAButton>
        </div>
      </div>
    </section>
  );
};