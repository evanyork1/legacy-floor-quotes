import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useCRM } from '@/hooks/useCRM';
import { toast } from 'sonner';
import { CRMFollowUp } from '@/types/crm';

interface CRMFollowUpFormProps {
  onClose: () => void;
  leadId?: string;
  leadName?: string;
  existingFollowUp?: CRMFollowUp;
}

export function CRMFollowUpForm({ onClose, leadId, leadName, existingFollowUp }: CRMFollowUpFormProps) {
  const { addFollowUp, updateFollowUp } = useCRM();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    existingFollowUp ? new Date(existingFollowUp.scheduled_at) : undefined
  );
  const [time, setTime] = useState(
    existingFollowUp ? format(new Date(existingFollowUp.scheduled_at), 'HH:mm') : '09:00'
  );
  const [title, setTitle] = useState(existingFollowUp?.title || '');
  const [notes, setNotes] = useState(existingFollowUp?.notes || '');
  const [isRecurring, setIsRecurring] = useState(existingFollowUp?.is_recurring || false);
  const [recurrenceInterval, setRecurrenceInterval] = useState(existingFollowUp?.recurrence_interval || 'weekly');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setLoading(true);
    try {
      const [hours, minutes] = time.split(':').map(Number);
      const scheduledAt = new Date(date);
      scheduledAt.setHours(hours, minutes, 0, 0);

      const followUpData = {
        lead_id: leadId || null,
        title: title.trim(),
        notes: notes.trim() || null,
        scheduled_at: scheduledAt.toISOString(),
        is_recurring: isRecurring,
        recurrence_interval: isRecurring ? recurrenceInterval : null,
      };

      if (existingFollowUp) {
        await updateFollowUp(existingFollowUp.id, followUpData);
        toast.success('Follow-up updated');
      } else {
        await addFollowUp(followUpData);
        toast.success('Follow-up created');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save follow-up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{existingFollowUp ? 'Edit Follow-Up' : 'New Follow-Up'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {leadName && (
            <div className="p-2 bg-muted rounded-md text-sm">
              Lead: <span className="font-medium">{leadName}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Follow up call"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMM d, yyyy") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={isRecurring}
                onCheckedChange={setIsRecurring}
              />
              <Label htmlFor="recurring">Repeating</Label>
            </div>

            {isRecurring && (
              <Select value={recurrenceInterval} onValueChange={setRecurrenceInterval}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : existingFollowUp ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
