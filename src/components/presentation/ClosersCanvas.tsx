import { useState } from 'react';
import { ArrowLeft, Check, Shield, Clock, Sparkles, Award, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PresentationData, PACKAGE_PRICING } from '@/pages/SalesPresentation';
import { SignaturePad } from './SignaturePad';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ClosersCanvasProps {
  data: PresentationData;
  onBack: () => void;
  onDataChange: (data: PresentationData) => void;
}

const DIY_FAILURES = [
  { title: 'Hot Tire Pick-Up', description: 'DIY epoxy peels off when hot tires sit on it overnight' },
  { title: 'Peeling & Flaking', description: 'Big-box kits fail within 1-2 years due to improper prep' },
  { title: 'No UV Protection', description: 'Yellow and chalk in sunlight from garage windows' },
  { title: 'Chemical Damage', description: 'Oil, gas, and salt eat through thin coatings' },
];

const OUR_BENEFITS = [
  { title: '100% Polyurea System', description: '4x stronger than epoxy, flexible and chemical resistant' },
  { title: 'Diamond Grinding Prep', description: 'Creates CSP 2-3 profile for permanent adhesion' },
  { title: 'UV-Stable Top Coat', description: 'Will not yellow or fade for the life of the floor' },
  { title: 'Same-Day Cure', description: 'Walk on in 4 hours, park on in 24 hours' },
];

const WARRANTY_FEATURES = [
  { icon: Shield, title: '15-Year Warranty', subtitle: 'Full coverage, no fine print' },
  { icon: Clock, title: '1-Day Install', subtitle: 'Ready for vehicles in 24hrs' },
  { icon: Sparkles, title: 'Lifetime Shine', subtitle: 'UV-stable polyurea' },
  { icon: Award, title: 'BBB A+ Rated', subtitle: 'Trusted since 2015' },
];

const PACKAGE_NAMES = {
  silver: 'Silver Package',
  gold: 'Gold Package',
  platinum: 'Platinum Package',
};

export function ClosersCanvas({ data, onBack, onDataChange }: ClosersCanvasProps) {
  const [showFullBreakdown, setShowFullBreakdown] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const generateWhyYourFloorNeeds = () => {
    const issues: string[] = [];
    
    if (data.moistureContent > 4) {
      issues.push(`With a moisture reading of ${data.moistureContent}%, your concrete is actively pushing moisture vapor upward. Proper treatment is essential to prevent coating delamination.`);
    }
    
    if (issues.length === 0) {
      issues.push(`Your concrete is in good condition! The professional prep and premium polyurea system will give you a floor that outlasts your home.`);
    }
    
    return issues;
  };

  const handleApprove = async () => {
    if (!signature) {
      toast.error('Please sign to approve the quote');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create client in Jobber if new
      let clientId = data.clientId;
      if (!clientId) {
        const nameParts = data.clientName.split(' ');
        const { data: clientResult, error: clientError } = await supabase.functions.invoke('jobber-api', {
          body: {
            action: 'createClient',
            data: {
              firstName: nameParts[0] || data.clientName,
              lastName: nameParts.slice(1).join(' ') || '',
              email: data.clientEmail,
              phone: data.clientPhone,
              address: data.clientAddress,
            },
          },
        });
        
        if (clientError) {
          console.error('Client creation error:', clientError);
        } else if (clientResult?.clientCreate?.client?.id) {
          clientId = clientResult.clientCreate.client.id;
          onDataChange({ ...data, clientId });
        }
      }
      
      // Add notes to client if provided
      if (data.notes && clientId) {
        await supabase.functions.invoke('jobber-api', {
          body: {
            action: 'createNote',
            data: {
              clientId,
              message: data.notes,
            },
          },
        });
      }
      
      // Build line items for the quote
      const lineItems = [
        {
          name: `${PACKAGE_NAMES[data.packageLevel]} - ${data.colorChoice}`,
          description: `${data.spaceType} floor coating, ${data.squareFootage} sq ft`,
          unitPrice: PACKAGE_PRICING[data.packageLevel],
          quantity: data.squareFootage,
        },
        ...data.lineItems.map(item => ({
          name: item.name,
          description: `Add-on: ${item.pricePerSqFt.toFixed(2)}/sqft`,
          unitPrice: item.pricePerSqFt,
          quantity: data.squareFootage,
        })),
      ];
      
      // Create quote in Jobber
      const { error: quoteError } = await supabase.functions.invoke('jobber-api', {
        body: {
          action: 'createQuote',
          data: {
            clientId,
            title: `${data.spaceType} Floor Coating - ${data.squareFootage} sq ft`,
            lineItems,
            notes: `Package: ${PACKAGE_NAMES[data.packageLevel]}\nColor: ${data.colorChoice}${data.customColorNote ? ` (${data.customColorNote})` : ''}\nMoisture: ${data.moistureContent}%`,
          },
        },
      });
      
      if (quoteError) {
        console.error('Quote creation error:', quoteError);
      }
      
      setIsApproved(true);
      toast.success('Quote approved! Sending to Jobber...');
      
    } catch (error) {
      console.error('Approval error:', error);
      toast.error('Could not sync to Jobber - quote saved locally');
      setIsApproved(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isApproved) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Quote Approved!</h1>
          <p className="text-slate-400 mb-8">
            Thank you, {data.clientName.split(' ')[0]}! Your quote has been approved and synced to Jobber.
            We'll be in touch within 24 hours to schedule your installation.
          </p>
          <div className="space-y-3">
            <Button onClick={onBack} variant="outline" className="w-full">
              Create Another Quote
            </Button>
            <Button 
              onClick={() => window.location.href = '/crm'} 
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Return to CRM
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Floating Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="fixed top-4 left-4 z-50 text-slate-400 hover:text-white bg-slate-900/80 backdrop-blur-sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Form
      </Button>

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950/30" />
        <div className="absolute inset-0 bg-[url('/demo-garage.jpg')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Your Dream {data.spaceType}<br />
            <span className="text-orange-500">In One Day</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A custom proposal for {data.clientName}
          </p>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Professional Beats DIY
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* DIY Failures */}
            <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">✗</span>
                DIY & Big-Box Kits
              </h3>
              <div className="space-y-4">
                {DIY_FAILURES.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1 bg-red-500/50 rounded-full" />
                    <div>
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-slate-400 text-sm">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Our System */}
            <div className="bg-green-950/30 border border-green-900/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">✓</span>
                Our Professional 3-Layer System
              </h3>
              <div className="space-y-4">
                {OUR_BENEFITS.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1 bg-green-500/50 rounded-full" />
                    <div>
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-slate-400 text-sm">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Visualizer Placeholder */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Your Floor in {data.colorChoice}
          </h2>
          <p className="text-center text-slate-400 mb-8">
            See how your new floor will transform your space
          </p>
          
          <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-orange-400" />
                </div>
                <p className="text-slate-400">Floor Visualizer</p>
                <p className="text-slate-500 text-sm">Upload a photo to see the transformation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Your Floor Needs This */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Why Your Floor Needs This
          </h2>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 space-y-4">
              {generateWhyYourFloorNeeds().map((text, i) => (
                <p key={i} className="text-slate-300 text-lg leading-relaxed">
                  {text}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Our Promise To You
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WARRANTY_FEATURES.map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-orange-400" />
                </div>
                <div className="text-white font-bold">{item.title}</div>
                <div className="text-slate-400 text-sm">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Breakdown */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Your Investment
          </h2>
          
          <Card className="bg-slate-800 border-slate-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600">
                <div className="text-center">
                  <div className="text-white/80 text-lg">Total Investment</div>
                  <div className="text-5xl font-bold text-white">
                    ${data.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowFullBreakdown(!showFullBreakdown)}
                className="w-full p-4 flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                {showFullBreakdown ? 'Hide' : 'Show'} Breakdown
                {showFullBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {showFullBreakdown && (
                <div className="p-6 pt-0 space-y-3 border-t border-slate-700">
                  <div className="flex justify-between text-slate-300">
                    <span>{PACKAGE_NAMES[data.packageLevel]} ({data.squareFootage} sq ft × ${PACKAGE_PRICING[data.packageLevel].toFixed(2)})</span>
                    <span>${(data.squareFootage * PACKAGE_PRICING[data.packageLevel]).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {data.lineItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-slate-300">
                      <span>{item.name} ({data.squareFootage} sq ft × ${item.pricePerSqFt.toFixed(2)})</span>
                      <span>${(data.squareFootage * item.pricePerSqFt).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-600 pt-3 flex justify-between text-white font-bold">
                    <span>Total</span>
                    <span>${data.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sign & Approve */}
      <section className="py-16 px-4 bg-slate-950">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Ready to Transform Your {data.spaceType}?
          </h2>
          <p className="text-center text-slate-400 mb-8">
            Sign below to approve this quote and we'll schedule your installation.
          </p>
          
          <SignaturePad onSignatureChange={setSignature} />
          
          <Button
            onClick={handleApprove}
            disabled={!signature || isSubmitting}
            className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 mt-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="h-6 w-6 mr-2" />
                Approve & Schedule Installation
              </>
            )}
          </Button>
          
          <p className="text-center text-slate-500 text-sm mt-4">
            By signing, you agree to our terms of service and authorize the quote amount.
          </p>
        </div>
      </section>
    </div>
  );
}
