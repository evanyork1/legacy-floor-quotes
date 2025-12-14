import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, Plus, Check, Trash2 } from 'lucide-react';
import { format, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { useCRM } from '@/hooks/useCRM';
import { CRMFollowUp } from '@/types/crm';
import { CRMFollowUpForm } from './CRMFollowUpForm';
import { toast } from 'sonner';

interface CRMCalendarViewProps {
  onBack: () => void;
}

export function CRMCalendarView({ onBack }: CRMCalendarViewProps) {
  const { fetchFollowUps, completeFollowUp, deleteFollowUp } = useCRM();
  const [followUps, setFollowUps] = useState<CRMFollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingFollowUp, setEditingFollowUp] = useState<CRMFollowUp | null>(null);

  useEffect(() => {
    loadFollowUps();
  }, []);

  const loadFollowUps = async () => {
    try {
      const data = await fetchFollowUps();
      setFollowUps(data);
    } catch (error) {
      console.error('Failed to load follow-ups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await completeFollowUp(id);
      setFollowUps(prev => prev.map(fu => 
        fu.id === id ? { ...fu, completed: true } : fu
      ));
      toast.success('Follow-up completed!');
    } catch (error) {
      toast.error('Failed to complete follow-up');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFollowUp(id);
      setFollowUps(prev => prev.filter(fu => fu.id !== id));
      toast.success('Follow-up deleted');
    } catch (error) {
      toast.error('Failed to delete follow-up');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingFollowUp(null);
    loadFollowUps();
  };

  const selectedDayFollowUps = followUps.filter(fu =>
    isSameDay(new Date(fu.scheduled_at), selectedDate)
  );

  // Get dates that have follow-ups for calendar highlighting
  const datesWithFollowUps = followUps.reduce((acc, fu) => {
    const dateKey = format(new Date(fu.scheduled_at), 'yyyy-MM-dd');
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (showForm || editingFollowUp) {
    return (
      <CRMFollowUpForm
        onClose={handleFormClose}
        existingFollowUp={editingFollowUp || undefined}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => setShowForm(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Follow-Up
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasFollowUp: (date) => {
                  const dateKey = format(date, 'yyyy-MM-dd');
                  return !!datesWithFollowUps[dateKey];
                }
              }}
              modifiersClassNames={{
                hasFollowUp: 'bg-primary/20 font-bold'
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {format(selectedDate, 'EEEE, MMMM d')}
              {selectedDayFollowUps.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedDayFollowUps.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-2">
                {[1, 2].map(i => (
                  <div key={i} className="h-16 bg-muted rounded" />
                ))}
              </div>
            ) : selectedDayFollowUps.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No follow-ups scheduled</p>
                <Button variant="outline" onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Follow-Up
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayFollowUps.map((followUp) => (
                  <div
                    key={followUp.id}
                    className={`p-3 rounded-md border ${
                      followUp.completed ? 'bg-muted/50 opacity-60' : 'bg-card'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${followUp.completed ? 'line-through' : ''}`}>
                            {followUp.title}
                          </span>
                          {followUp.is_recurring && (
                            <Badge variant="outline" className="text-xs">
                              {followUp.recurrence_interval}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(followUp.scheduled_at), 'h:mm a')}
                        </p>
                        {followUp.lead && (
                          <p className="text-sm text-muted-foreground">
                            Lead: {followUp.lead.name}
                          </p>
                        )}
                        {followUp.notes && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {followUp.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {!followUp.completed && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleComplete(followUp.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(followUp.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
