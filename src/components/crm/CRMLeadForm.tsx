import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCRM } from '@/hooks/useCRM';
import { LEAD_STAGES, type CRMLead, type DuplicateLead } from '@/types/crm';
import { DuplicateLeadModal } from './DuplicateLeadModal';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

interface CRMLeadFormProps {
  onClose: () => void;
  existingLead?: CRMLead;
}

export function CRMLeadForm({ onClose, existingLead }: CRMLeadFormProps) {
  const { addLead, updateLead } = useCRM();
  const [loading, setLoading] = useState(false);
  const [duplicateLead, setDuplicateLead] = useState<DuplicateLead | null>(null);
  
  const [formData, setFormData] = useState({
    name: existingLead?.name || '',
    phone: existingLead?.phone || '',
    email: existingLead?.email || '',
    address: existingLead?.address || '',
    website: existingLead?.website || '',
    linkedin: existingLead?.linkedin || '',
    stage: existingLead?.stage || 'new',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setLoading(true);

    if (existingLead) {
      const success = await updateLead(existingLead.id, formData);
      if (success) {
        toast.success('Lead updated');
        onClose();
      } else {
        toast.error('Failed to update lead');
      }
    } else {
      const result = await addLead({
        ...formData,
        assigned_to: null
      });

      if (result.success) {
        toast.success('Lead added');
        onClose();
      } else if (result.error === 'duplicate') {
        setDuplicateLead(result.lead as unknown as DuplicateLead);
      } else {
        toast.error(result.error || 'Failed to add lead');
      }
    }

    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>{existingLead ? 'Edit Lead' : 'Add New Lead'}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Contact name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stage">Stage</Label>
                <Select value={formData.stage} onValueChange={(v) => handleChange('stage', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAD_STAGES.map(stage => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Street address, city, state"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="LinkedIn profile URL"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 gap-2">
                <Save className="h-4 w-4" />
                {loading ? 'Saving...' : existingLead ? 'Update' : 'Add Lead'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <DuplicateLeadModal
        duplicate={duplicateLead}
        onClose={() => setDuplicateLead(null)}
      />
    </>
  );
}
