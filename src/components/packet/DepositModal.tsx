import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  packetId: string;
  defaultName: string;
  defaultEmail: string;
  defaultPhone: string;
  onSuccess: () => void;
}

export const DepositModal = ({
  isOpen,
  onClose,
  packetId,
  defaultName,
  defaultEmail,
  defaultPhone,
  onSuccess,
}: DepositModalProps) => {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState(defaultPhone);
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error('Please fill in all fields, including your installation address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('public-floor-packet', {
        body: {
          action: 'request_deposit',
          id: packetId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
        },
      });

      if (error) throw error;

      toast.success("You'll receive a text shortly with your deposit link.");
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error requesting deposit:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle className="text-xl font-semibold">Reserve Your Install</DialogTitle>
        <DialogDescription>
          Confirm your details and installation address. We'll text you a secure link to make your $100 fully-refundable deposit.
        </DialogDescription>

        <div className="space-y-4 mt-2">
          <div>
            <Label htmlFor="deposit-name" className="mb-1.5 block">Name</Label>
            <Input id="deposit-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="deposit-email" className="mb-1.5 block">Email</Label>
            <Input id="deposit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="deposit-phone" className="mb-1.5 block">Phone</Label>
            <Input id="deposit-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="deposit-address" className="mb-1.5 block">Installation Address</Label>
            <Input
              id="deposit-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, Dallas, TX 75201"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-neutral-900 hover:bg-black text-white py-5 text-sm font-semibold tracking-wide mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>Send Me My Deposit Link</>
          )}
        </Button>
        <p className="text-xs text-center text-gray-500 mt-2">
          Fully refundable. Once the deposit is made, we'll reach out to answer questions and schedule your installation.
        </p>
      </DialogContent>
    </Dialog>
  );
};
