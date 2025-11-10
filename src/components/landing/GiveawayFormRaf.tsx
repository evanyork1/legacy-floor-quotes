import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export const GiveawayFormRaf = () => {
  useEffect(() => {
    // Load Stripe buy button script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="min-h-screen pt-24 pb-8 md:pb-16 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center">
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Garage Floor <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Giveaway!</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Enter to win a FREE garage floor coating (up to <span className="text-green-600 font-bold">$4,000 value</span>)
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    Entry deadline November 14th, winner announced November 17th. Must live in Dallas Fort Worth area
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div dangerouslySetInnerHTML={{
                  __html: `
                    <stripe-buy-button
                      buy-button-id="buy_btn_1SRzz6LlGj155tt96auzNkzL"
                      publishable-key="pk_live_51PpgloLlGj155tt97tVJfMfnTRkQPE6iDq0F4XU4nWNpMRr5PsjnC8LhgdScZl7LMheCzYoUHQ2uMfLwtFpHloZO002DlVFsiK"
                    >
                    </stripe-buy-button>
                  `
                }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Before/After Images Below Form */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl shadow-2xl">
              <div className="grid grid-cols-2 h-full gap-1">
                {/* Before Image */}
                <div className="relative overflow-hidden">
                  <img src="/lovable-uploads/69253a31-4762-4988-897d-8bc135fd43bd.png" alt="Before: Concrete garage floor before coating installation" className="w-full h-full object-cover" />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      BEFORE
                    </span>
                  </div>
                </div>
                {/* After Image */}
                <div className="relative overflow-hidden">
                  <img src="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png" alt="After: Beautiful residential garage floor with polyurea flake coating" className="w-full h-full object-cover" />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="bg-white text-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-blue-600">
                      AFTER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
