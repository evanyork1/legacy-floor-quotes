import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
export const GiveawayForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    referredBy: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Insert into giveaway table
      const {
        error
      } = await supabase.from('giveaway').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        referred_by: formData.referredBy || null
      });
      if (error) throw error;

      // Send welcome email
      try {
        await supabase.functions.invoke('send-giveaway-email', {
          body: {
            name: formData.name,
            email: formData.email
          }
        });
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't fail the submission if email fails
      }

      // Track with Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'CompleteRegistration', {
          content_name: 'Giveaway Entry',
          status: 'completed'
        });
      }
      setShowSuccessDialog(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        referredBy: ""
      });
    } catch (error) {
      console.error('Error submitting giveaway entry:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="min-h-screen pt-24 pb-8 md:pb-16 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center">
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Garage Floor <span className="text-blue-900">Giveaway!</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Enter to win a FREE garage floor coating (up to <span className="text-green-600 font-bold">$4,000 value</span>)
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">Final entry November 14th. Winner announced November 17th.<strong>Referral Bonus:</strong> Every time someone enters with your name in the "Referred By" field, you get an additional entry! The more people you refer, the better your chances of winning.
                  </p>
                </div>
                
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" type="text" required value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" required value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} className="mt-1" placeholder="(214) 555-0123" />
                </div>

                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Input id="address" type="text" required value={formData.address} onChange={e => setFormData({
                  ...formData,
                  address: e.target.value
                })} className="mt-1" placeholder="123 Main St, Dallas, TX 75001" />
                  <p className="text-sm text-red-600 font-medium mt-2">
                    Must live in Dallas-Fort Worth area
                  </p>
                </div>

                <div>
                  <Label htmlFor="referredBy">Referred By (Optional)</Label>
                  <Input id="referredBy" type="text" value={formData.referredBy} onChange={e => setFormData({
                  ...formData,
                  referredBy: e.target.value
                })} className="mt-1" placeholder="Enter referrer's name" />
                  <p className="text-xs text-gray-500 mt-1">
                    If someone referred you, enter their name here to give them an extra entry!
                  </p>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-900 hover:bg-blue-950 text-white py-6 text-lg">
                  {isSubmitting ? "Submitting..." : "Enter Giveaway"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Before/After Images Below Form */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-900 rounded-2xl blur opacity-20"></div>
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl shadow-2xl">
              <div className="grid grid-cols-2 h-full gap-1">
                {/* Before Image */}
                <div className="relative overflow-hidden">
                  <img src="/lovable-uploads/69253a31-4762-4988-897d-8bc135fd43bd.png" alt="Before: Concrete garage floor before coating installation" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      BEFORE
                    </span>
                  </div>
                </div>
                {/* After Image */}
                <div className="relative overflow-hidden">
                  <img src="/lovable-uploads/b4732a11-b0eb-48f7-9950-d9c8e186ab97.png" alt="After: Beautiful residential garage floor with polyurea flake coating" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
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

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">You're Entered!</DialogTitle>
            <DialogDescription className="text-center text-base space-y-3 pt-2">
              <p className="font-semibold text-gray-900">
                Thank you for entering the giveaway!
              </p>
              <p>
                Check your email for confirmation and details about the drawing.
              </p>
              
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccessDialog(false)} className="w-full bg-blue-900 hover:bg-blue-950">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </section>;
};