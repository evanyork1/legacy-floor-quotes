import { useState } from 'react';
import { Check, Shield, Clock, Award, Sparkles, ChevronDown, ChevronUp, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SignaturePad } from './SignaturePad';
import { colorOptions } from '@/constants/colorOptions';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FloorEntry {
  id: string;
  floorType: string;
  squareFootage: number;
  additives: string[];
  colorChoice?: string;
  customColorNote?: string;
  warrantyType?: 'lifetime' | '15year' | 'custom';
  customWarrantyNote?: string;
}

interface PresentationData {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  spaceType: string;
  squareFootage: number;
  moistureContent: number;
  colorChoice: string;
  customColorNote: string;
  lineItems: Array<{ id: string; name: string; pricePerSqFt: number; note?: string }>;
  warrantyType: string;
  customWarrantyNote: string;
  depositType: string;
  customDepositAmount: number | null;
  presentationNotes: string;
  silverTotal: number;
  goldTotal: number;
  platinumTotal: number;
  selectedPackage: string | null;
  status: string;
  sitePhotos: string[];
  floorEntries?: FloorEntry[];
}

interface CustomerPresentationProps {
  data: PresentationData;
  onUpdate: (updates: Partial<PresentationData>) => void;
  isShareable?: boolean;
  onColorChange?: (color: string) => void;
}

const PACKAGE_FEATURES = {
  silver: {
    name: 'Silver',
    color: 'text-slate-400',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
    features: [
      'Budget Friendly Option',
      'Basic Color Options',
      '15 Year Warranty',
    ],
  },
  gold: {
    name: 'Gold',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-400',
    popular: true,
    features: [
      'One Day Install',
      'Most Purchased Floor',
      'Full Color Selection',
      'Premium Thickness Polyurea Floor',
      'Lifetime Warranty',
    ],
  },
  platinum: {
    name: 'Platinum',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-400',
    features: [
      'Install Within 4 Days',
      'We Move Your Stuff Out & Back In',
      'Premium Thickness Polyurea Floor',
      'Lifetime Warranty',
    ],
  },
};

const WARRANTY_LABELS: Record<string, string> = {
  lifetime: 'Lifetime Warranty',
  '15year': '15 Year Warranty',
  custom: 'Custom Warranty',
};

const CUSTOMER_AGREEMENT = `CUSTOMER AGREEMENT 

DEPOSIT REFUND
If a job is not booked within 30 days of deposit being made, half of the deposit (50%) will become non refundable. 

CARD ON FILE
Customer agrees to saving a card on file. When job is complete we will contact you to confirm us charging the remaining balance.

CANCELLATION
Cancellations of jobs must be made at least 5 days prior to installation. If you determine you need to move your install date or cancel, a 5 day notice is required. If job is cancelled in less than 5 days, a $500 fee will be charged.

TEXTURE
Any surface can be slippery, especially when wet with any fluid. Legacy Industrial Coatings provide a non-porous finish that could result in temporary standing water/fluid and can become slippery when wet. Further, any surface can sweat or condensate when the slab temperature is cooler than the warm air around it. Our coating system provides a layer of insulation which may help with sweating but will NOT eliminate it. It is advised that slip resistant additives be applied to any coating system where this is a concern. 

In no event shall Legacy Industrial Coatings be responsible for injury incurred by a slip or fall situation. It is the purchaser's sole responsibility to provide for their own safety and the safety of their guests. While slip resistant additives can assist with slip/fall prevention, there is no guarantee that someone will not slip while walking on coated areas. 

Future updates to this floor project to alter texture and/or slip resistance are subject to an additional cost to the customer. 

SUBSTRATE FAILURE / CRACK REPAIR
Legacy Industrial Coatings uses a proprietary concrete mender system to fill/repair existing cracks. However, future settling, stress, expansion, and contraction can cause cracks to return. Customer acknowledges that substrate failure (including cracks) is NOT COVERED BY THE WARRANTY.

Legacy Industrial Coatings does NOT recommend filling in concrete expansion joints. These joints can be noticeable through the finished coating after repair. The joints are also likely to open up over time as the two separate concrete slabs move.

DUST PROTECTION
Legacy Industrial Coatings uses industrial grade equipment and vacuum systems that collect most dust created during the installation process. However, some dust will escape and could be deposited in the working and adjacent area.

It is the responsibility of the CUSTOMER to remove and/or protect any items (i.e. wall decorations, electronics, cabinets, shelving, etc.) prior to the installation of your coating system.

WARRANTY
A full copy of our warranty is available on our website. By signing this agreement, you agree to the terms of the warranty on our company website. 

SURFACE IMPERFECTIONS
Legacy Industrial Coatings will thoroughly prepare the existing concrete to receive the coating application. Legacy Industrial Coatings does not however float or level the floor before coating. We only remove an average of 1/16th of an inch of concrete which is not enough to create any low spots or changes in the level of the floor. Application of coating may not alter or eliminate existing surface imperfections, such as high/low spots in the concrete and may result in standing water. There is no expressed or implied guarantee that surface imperfections will be completely hidden by the coating process. Water that may have been soaked in by concrete prior to coating will sit on top of the coating surface after installation. 

DAY OF INSTALL
Legacy Industrial Coatings is not responsible for moving any personal items away from the surface that is to be coated. Customer is solely responsible to have all belongings moved out of the space and off the surface prior to crew arrival. If the crew arrives and the space is not cleared out, a $500 fee will be applied to the final payment of the project. 

Cancellations of jobs must be made at least 7 days prior to installation. If you determine you need to move your install date or cancel, a 7 day notice is required. 

Legacy Industrial Coatings reserves the right to reschedule jobs due to weather at any point leading up the install day as this is unavoidable. 

Our crew must have a way to get into the property on the day of install otherwise a $500 fee will be applied to the final payment of the project. 

RETURN TO USE
12 hours after completion: light foot traffic may resume.

24 hours after completion: return to full use. (i.e. - vehicle traffic, heavy items such as tool boxes, appliances, etc.)

Legacy Industrial Coatings is NOT responsible for damages caused by premature use of the coated surface outside of these guidelines.

Customer agrees to saving a card on file. When job is complete we will contact you to confirm us charging the remaining balance.`;

const COLOR_OPTIONS = [
  'Domino',
  'Creek Bed',
  'Wombat',
  'Tidal Wave',
  'Raven',
  'Cabin Fever',
];

const FLOOR_TYPE_LABELS: Record<string, string> = {
  garage: 'Garage Floor',
  patio: 'Patio Floor',
  basement: 'Basement',
  commercial: 'Commercial Space',
};

export function CustomerPresentation({ data, onUpdate, isShareable = false, onColorChange }: CustomerPresentationProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(data.selectedPackage);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementScrolled, setAgreementScrolled] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(data.status === 'signed');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [currentColor, setCurrentColor] = useState(data.colorChoice);

  const selectedColor = colorOptions.find(c => c.id === currentColor.toLowerCase().replace(' ', '-')) || colorOptions[0];

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    if (onColorChange) {
      onColorChange(color);
    }
  };

  const getPackageTotal = (pkg: 'silver' | 'gold' | 'platinum') => {
    switch (pkg) {
      case 'silver': return data.silverTotal;
      case 'gold': return data.goldTotal;
      case 'platinum': return data.platinumTotal;
    }
  };

  const getDepositAmount = (total: number) => {
    switch (data.depositType) {
      case '10': return total * 0.1;
      case '50': return total * 0.5;
      case '100': return total;
      case 'custom': return data.customDepositAmount || 0;
      default: return total * 0.5;
    }
  };

  const getMonthlyPayment = (total: number) => Math.round(total / 24);

  const handleSelectPackage = (pkg: string) => {
    setSelectedPackage(pkg);
  };

  const handleProceedToSign = () => {
    if (!selectedPackage) {
      toast.error('Please select a package first');
      return;
    }
    setShowAgreement(true);
  };

  const handleAgreementScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrolledToBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    if (scrolledToBottom) {
      setAgreementScrolled(true);
    }
  };

  const handleSubmit = async () => {
    if (!signature || !agreementAccepted || !selectedPackage) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const total = getPackageTotal(selectedPackage as 'silver' | 'gold' | 'platinum');
      const deposit = getDepositAmount(total);

      const { error } = await supabase
        .from('sales_presentations')
        .update({
          selected_package: selectedPackage,
          selected_deposit_amount: deposit,
          signature_data: signature,
          signed_at: new Date().toISOString(),
          agreement_accepted: true,
          status: 'signed',
        })
        .eq('id', data.id);

      if (error) throw error;

      setIsComplete(true);
      toast.success('Quote approved! We will be in touch shortly.');
      
      onUpdate({
        selectedPackage,
        status: 'signed',
      });
    } catch (error) {
      console.error('Error signing presentation:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Quote Approved!</h1>
          <p className="text-slate-400 mb-8">
            Thank you, {data.clientName.split(' ')[0]}! Your {selectedPackage} package has been approved.
            We'll be in touch within 24 hours to schedule your installation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white py-4 px-6 flex items-center justify-between">
        <img src="/lovable-uploads/f8190725-62df-42e7-9d92-285d2f3f78e3.png" alt="Legacy Industrial Coatings" className="h-12" />
        <a href="tel:214-305-6516" className="text-lg font-semibold hover:text-blue-200">214-305-6516</a>
      </header>

      {/* Title Section */}
      <section className="bg-gradient-to-b from-[#1e3a5f] to-[#2a4a70] text-white py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Flake Floor Options</h1>
        
        {/* Floor Entries */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
          {data.floorEntries && data.floorEntries.length > 0 ? (
            data.floorEntries.map((entry, index) => (
              <div key={entry.id || index} className="text-center">
                <div className="text-sm text-blue-200 uppercase tracking-wide mb-1">
                  {FLOOR_TYPE_LABELS[entry.floorType] || entry.floorType}
                </div>
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <div className="text-xl font-bold">{entry.squareFootage} sq ft</div>
                  <div className="text-xs text-blue-200 mt-1">
                    {entry.colorChoice || data.colorChoice} • {WARRANTY_LABELS[entry.warrantyType || data.warrantyType] || 'Lifetime Warranty'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <div className="text-sm text-blue-200 uppercase tracking-wide mb-1">Square Footage</div>
              <div className="bg-white/10 rounded-lg px-6 py-3 text-xl font-bold">{data.squareFootage} sq ft</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-sm text-blue-200 uppercase tracking-wide mb-1">Total</div>
            <div className="bg-white/10 rounded-lg px-6 py-3 text-xl font-bold">{data.squareFootage} sq ft</div>
          </div>
        </div>
      </section>

      {/* Color Selection & Preview */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-center text-gray-900">Selected Color</h2>
            {!isShareable && onColorChange && (
              <Select value={currentColor} onValueChange={handleColorChange}>
                <SelectTrigger className="w-64 bg-white border-gray-300">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {COLOR_OPTIONS.map((color) => (
                    <SelectItem key={color} value={color} className="hover:bg-gray-100">
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {selectedColor.preview ? (
              <img 
                src={selectedColor.preview} 
                alt={selectedColor.name} 
                className="w-full h-64 md:h-96 object-cover"
              />
            ) : selectedColor.demoImage ? (
              <img 
                src={selectedColor.demoImage} 
                alt={selectedColor.name} 
                className="w-full h-64 md:h-96 object-cover"
              />
            ) : (
              <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gray-100">
                <img 
                  src={selectedColor.thumbnail} 
                  alt={selectedColor.name} 
                  className="h-48 w-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Package Options - Main Feature */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Choose Your Package</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {(['platinum', 'gold', 'silver'] as const).map((pkg) => {
              const info = PACKAGE_FEATURES[pkg];
              const total = getPackageTotal(pkg);
              const deposit = getDepositAmount(total);
              const monthly = getMonthlyPayment(total);
              const isSelected = selectedPackage === pkg;
              
              return (
                <Card 
                  key={pkg}
                  onClick={() => handleSelectPackage(pkg)}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? `ring-4 ring-blue-500 ${info.bgColor} scale-[1.02]` 
                      : `${info.bgColor} hover:shadow-lg`
                  } ${info.borderColor} border-2`}
                >
                  {'popular' in info && info.popular && (
                    <div className="absolute -top-3 right-4 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      MOST POPULAR
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <h3 className={`text-2xl font-bold ${info.color} mb-6`}>{info.name}</h3>
                    
                    <div className="space-y-3 mb-8">
                      {info.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Monthly Payment</div>
                        <div className="text-2xl font-bold text-gray-900">${monthly}/mo</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">{data.depositType}% Deposit</div>
                        <div className="text-xl font-semibold text-gray-700">${deposit.toLocaleString()}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Total Investment</div>
                        <div className="text-2xl font-bold text-blue-600">${total.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="mt-4 bg-blue-500 text-white text-center py-2 rounded-lg font-semibold">
                        Selected
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Line Items Breakdown */}
      {data.lineItems.length > 0 && (
        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800"
            >
              {showBreakdown ? 'Hide' : 'Show'} Add-ons Included
              {showBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {showBreakdown && (
              <div className="mt-4 bg-white rounded-lg p-4 space-y-2">
                {data.lineItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-700">
                    <span>{item.name}</span>
                    <span>${(data.squareFootage * item.pricePerSqFt).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Warranty & Notes */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-gray-900">{WARRANTY_LABELS[data.warrantyType]}</h3>
              {data.customWarrantyNote && (
                <p className="text-sm text-gray-600 mt-2">{data.customWarrantyNote}</p>
              )}
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <Clock className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-gray-900">1-Day Install</h3>
              <p className="text-sm text-gray-600 mt-2">Ready for vehicles in 24hrs</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-6 text-center">
              <Star className="h-10 w-10 text-amber-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-gray-900">3,000+ Floors</h3>
              <p className="text-sm text-gray-600 mt-2">Garage floors installed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Presentation Notes / Disclaimers */}
      {data.presentationNotes && (
        <section className="py-8 px-4 bg-yellow-50">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Important Notes</h3>
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <p className="text-gray-700 whitespace-pre-wrap">{data.presentationNotes}</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-lg mx-auto text-center">
          <Button
            onClick={handleProceedToSign}
            disabled={!selectedPackage}
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Check className="h-6 w-6 mr-2" />
            Approve Quote & Pay Deposit
          </Button>
          
          {!selectedPackage && (
            <p className="text-gray-500 mt-4">Please select a package above to continue</p>
          )}
        </div>
      </section>

      {/* Agreement Modal */}
      <Dialog open={showAgreement} onOpenChange={setShowAgreement}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Customer Agreement</DialogTitle>
            <DialogDescription>
              Please read and scroll through the entire agreement before signing.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea 
            className="h-64 border rounded-lg p-4"
            onScrollCapture={handleAgreementScroll}
          >
            <div className="whitespace-pre-wrap text-sm text-gray-700">
              {CUSTOMER_AGREEMENT}
            </div>
          </ScrollArea>
          
          {!agreementScrolled && (
            <p className="text-amber-600 text-sm text-center">
              Please scroll to read the entire agreement
            </p>
          )}
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreementAccepted}
                onChange={(e) => setAgreementAccepted(e.target.checked)}
                disabled={!agreementScrolled}
                className="mt-1 h-5 w-5"
              />
              <span className="text-sm text-gray-700">
                I have read and agree to the Customer Agreement and understand the terms and conditions.
              </span>
            </label>
            
            {agreementAccepted && (
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Sign Below</h4>
                <SignaturePad onSignatureChange={setSignature} />
              </div>
            )}
            
            <Button
              onClick={handleSubmit}
              disabled={!agreementAccepted || !signature || isSubmitting}
              className="w-full h-14 text-lg font-bold bg-green-500 hover:bg-green-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Sign & Submit (${getDepositAmount(getPackageTotal(selectedPackage as any)).toLocaleString()} Deposit)
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}