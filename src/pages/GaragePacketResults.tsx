import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Phone, CheckCircle, Loader2, Shield, Clock, Award, Palette, X } from 'lucide-react';
import { colorOptions } from '@/constants/colorOptions';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DepositModal } from '@/components/packet/DepositModal';

interface FloorPacket {
  id: string;
  name: string;
  email: string;
  phone: string;
  garage_type: string;
  custom_sqft: number | null;
  selected_color: string;
  visualization_url: string | null;
  estimated_price: number;
  ready_to_proceed: boolean;
  created_at: string;
}

const GaragePacketResults = () => {
  const { id } = useParams<{ id: string }>();
  const [packet, setPacket] = useState<FloorPacket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isColorSheetOpen, setIsColorSheetOpen] = useState(false);
  const [selectedNewColor, setSelectedNewColor] = useState<string | null>(null);
  const [isSavingColor, setIsSavingColor] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositRequested, setDepositRequested] = useState(false);

  useEffect(() => {
    const fetchPacket = async () => {
      if (!id) return;

      const { data, error } = await supabase.functions.invoke(
        'public-floor-packet',
        { body: { action: 'get', id } }
      );

      if (error || !data?.data) {
        console.error('Error fetching packet:', error);
        toast.error('Could not load your report');
      } else {
        setPacket(data.data);
      }
      setIsLoading(false);
    };

    fetchPacket();
  }, [id]);

  // Deposit submission is handled inside DepositModal; results page just tracks confirmation state.


  const handleSaveColor = async () => {
    if (!packet || !selectedNewColor) return;

    setIsSavingColor(true);

    try {
      const { error } = await supabase.functions.invoke(
        'public-floor-packet',
        { body: { action: 'update_color', id: packet.id, selected_color: selectedNewColor } }
      );

      if (error) throw error;

      setPacket(prev => prev ? { ...prev, selected_color: selectedNewColor } : null);
      setIsColorSheetOpen(false);
      setSelectedNewColor(null);
      toast.success('Color updated successfully!');
    } catch (error) {
      console.error('Error updating color:', error);
      toast.error('Failed to update color. Please try again.');
    } finally {
      setIsSavingColor(false);
    }
  };

  const selectedColorOption = colorOptions.find(c => c.id === packet?.selected_color);
  const monthlyPayment = packet ? Math.round(packet.estimated_price / 24) : 0;

  const testimonials = [
    { name: "Matthew S.", location: "Prosper, TX", text: "Incredible how much better these floors make your garage look and feel.", rating: 5 },
    { name: "Bharat A.", location: "Frisco, TX", text: "Excellent experience from start to finish. The crew did an amazing job.", rating: 5 },
    { name: "Scott C.", location: "McKinney, TX", text: "Totally exceeded my expectations. Finished floor is amazing.", rating: 5 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your report...</p>
        </div>
      </div>
    );
  }

  if (!packet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h1>
          <p className="text-gray-600">This report may have expired or doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Your Garage Floor Quote | Legacy Industrial</title>
        <meta name="description" content="Your personalized garage floor coating quote from Legacy Industrial." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header Banner */}
        <div className="bg-blue-600 py-3">
          <a 
            href="tel:214-305-6516"
            className="flex items-center justify-center gap-2 text-white font-semibold hover:text-blue-100 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Questions? Call Us: 214-305-6516</span>
          </a>
        </div>

        {/* Personalized Header */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-black text-white py-5 sm:py-7 px-4 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-1">
              {packet.name.split(' ')[0]}'s Garage Floor Report
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Personalized quote · {new Date(packet.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* 1) Price Quote Card */}
        <section className="py-8 sm:py-10 px-4">
          <div className="max-w-xl mx-auto">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center border-b border-gray-100 pb-5 mb-5">
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Your Price Quote</p>
                  <div className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight">
                    ${packet.estimated_price.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Final measurements on day of install</p>
                </div>

                <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-md px-4 py-3 mb-5">
                  <div>
                    <p className="text-xs text-gray-500">24 months · 0% interest</p>
                    <p className="text-sm font-medium text-gray-900">Monthly financing</p>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    ${monthlyPayment.toLocaleString()}<span className="text-sm font-normal text-gray-500">/mo</span>
                  </div>
                </div>

                <dl className="text-sm divide-y divide-gray-100 mb-6">
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Garage Size</dt>
                    <dd className="font-medium text-gray-900">
                      {packet.garage_type === "custom"
                        ? `${packet.custom_sqft} sq ft`
                        : `${packet.garage_type.split('-')[0]}-Car Garage`}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Color</dt>
                    <dd className="font-medium text-gray-900 capitalize">{packet.selected_color.replace('-', ' ')}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Coating</dt>
                    <dd className="font-medium text-gray-900">Premium Polyurea</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-500">Warranty</dt>
                    <dd className="font-medium text-gray-900">Lifetime</dd>
                  </div>
                </dl>

                {/* CTA Button */}
                {depositRequested || packet.ready_to_proceed ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <h3 className="text-green-900 font-semibold text-sm mb-1">You're All Set</h3>
                    <p className="text-green-800 text-xs">
                      You will receive a text shortly with a link to make your $100 deposit.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => setIsDepositModalOpen(true)}
                      className="w-full bg-neutral-900 hover:bg-black text-white py-5 text-sm font-semibold tracking-wide"
                    >
                      Make a $100 Deposit to Get Started
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                      Fully refundable. Once the deposit is made, we'll reach out to you to answer questions and schedule your installation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>


        {/* 2) Reviews Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((review, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">"{review.text}"</p>
                  <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                  <p className="text-gray-500 text-xs">{review.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3) Selected Color Preview */}
        <section className="py-8 sm:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Your Selected Color</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
              {packet.visualization_url ? (
                <img
                  src={packet.visualization_url}
                  alt="Your visualized garage"
                  className="w-full h-64 md:h-96 object-cover"
                loading="eager" decoding="async" fetchPriority="high" />
              ) : selectedColorOption?.preview ? (
                <img
                  src={selectedColorOption.preview}
                  alt={selectedColorOption.name}
                  className="w-full h-64 md:h-96 object-cover"
                 loading="eager" decoding="async" />
              ) : selectedColorOption?.thumbnail ? (
                <div className="flex items-center justify-center h-64 bg-gray-100">
                  <img
                    src={selectedColorOption.thumbnail}
                    alt={selectedColorOption.name}
                    className="h-48 w-48 object-cover rounded-lg"
                   loading="eager" decoding="async" />
                </div>
              ) : null}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 capitalize">
                  {selectedColorOption?.name || packet.selected_color.replace('-', ' ')}
                </h3>
                <p className="text-gray-600 mb-4">Premium polyurea flake coating</p>

                <Sheet open={isColorSheetOpen} onOpenChange={setIsColorSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Palette className="h-4 w-4" />
                      Change Color
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-auto max-h-[60vh]">
                    <SheetHeader className="mb-4">
                      <SheetTitle>Select a New Color</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
                      {colorOptions.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedNewColor(color.id)}
                          className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                            selectedNewColor === color.id
                              ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <img
                            src={color.thumbnail}
                            alt={color.name}
                            className="w-full h-full object-cover"
                           loading="eager" decoding="async" fetchPriority="high" />
                          {selectedNewColor === color.id && (
                            <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                              <CheckCircle className="h-6 w-6 text-blue-600" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    {selectedNewColor && (
                      <div className="flex items-center justify-between border-t pt-4">
                        <p className="text-sm text-gray-600">
                          Selected: <span className="font-semibold capitalize">{colorOptions.find(c => c.id === selectedNewColor)?.name}</span>
                        </p>
                        <Button
                          onClick={handleSaveColor}
                          disabled={isSavingColor}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isSavingColor ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            'Save Color'
                          )}
                        </Button>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </section>

        {/* 4) Why Choose */}
        <section className="py-8 sm:py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Why Choose Legacy Industrial Coatings?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">1-Day Installation</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Your floor is done in a single day. Drive on it in 24 hours.</p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Lifetime Warranty</h3>
                <p className="text-gray-600 text-xs sm:text-sm">We stand behind our work with a comprehensive lifetime warranty.</p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">3,000+ Garages Installed</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Trusted by homeowners across Dallas-Fort Worth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5) Our Process */}
        <section className="py-8 sm:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Our Process</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-base">1</div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1">Pre-Measure</h4>
                <p className="text-gray-600 text-[10px] sm:text-xs">Precise measurements ensure perfect material coverage</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-base">2</div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1">Diamond Grinding</h4>
                <p className="text-gray-600 text-[10px] sm:text-xs">700-lb grinder profiles concrete for ideal adhesion</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-base">3</div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1">Crack Repair</h4>
                <p className="text-gray-600 text-[10px] sm:text-xs">All imperfections filled for a smooth, uniform base</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center shadow-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-base">4</div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1">Base + Flake</h4>
                <p className="text-gray-600 text-[10px] sm:text-xs">Polyurea base coat with your selected color flake</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center shadow-sm col-span-2 sm:col-span-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-base">5</div>
                <h4 className="font-semibold text-xs sm:text-sm mb-1">Top Coat</h4>
                <p className="text-gray-600 text-[10px] sm:text-xs">High-gloss finish for chemical & abrasion resistance</p>
              </div>
            </div>
          </div>
        </section>


        {/* Call CTA */}
        <section className="py-12 px-4 bg-blue-900">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Have Questions?
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Our team is ready to help you get started
            </p>
            <a 
              href="tel:214-305-6516"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call Us: 214-305-6516
            </a>
          </div>
        </section>

        <Footer />
      </div>

      {packet && (
        <DepositModal
          isOpen={isDepositModalOpen}
          onClose={() => setIsDepositModalOpen(false)}
          packetId={packet.id}
          defaultName={packet.name}
          defaultEmail={packet.email}
          defaultPhone={packet.phone}
          onSuccess={() => setDepositRequested(true)}
        />
      )}
    </>
  );
};

export default GaragePacketResults;
