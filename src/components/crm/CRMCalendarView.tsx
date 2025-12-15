import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, Plus, Trash2, Pencil } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { useCRM } from '@/hooks/useCRM';
import { CRMFollowUp } from '@/types/crm';
import { CRMFollowUpForm } from './CRMFollowUpForm';
import { toast } from 'sonner';

interface CRMCalendarViewProps {
  onBack: () => void;
}

export function CRMCalendarView({ onBack }: CRMCalendarViewProps) {
  const { fetchFollowUps, deleteFollowUp } = useCRM();
  const [followUps, setFollowUps] = useState<CRMFollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingFollowUp, setEditingFollowUp] = useState<CRMFollowUp | null>(null);
  const [newItemType, setNewItemType] = useState<'follow_up' | 'appointment'>('follow_up');

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

  const handleDelete = async (id: string) => {
    try {
      await deleteFollowUp(id);
      setFollowUps(prev => prev.filter(fu => fu.id !== id));
      toast.success('Deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingFollowUp(null);
    loadFollowUps();
  };

  const handleAddNew = (type: 'follow_up' | 'appointment') => {
    setNewItemType(type);
    setShowForm(true);
  };

  const selectedDayFollowUps = followUps.filter(fu =>
    isSameDay(new Date(fu.scheduled_at), selectedDate) && !fu.completed
  );

  // Get dates that have follow-ups for calendar highlighting
  const datesWithFollowUps = followUps.reduce((acc, fu) => {
    if (fu.completed) return acc;
    const dateKey = format(new Date(fu.scheduled_at), 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(fu.type || 'follow_up');
    return acc;
  }, {} as Record<string, string[]>);

  if (showForm || editingFollowUp) {
    return (
      <CRMFollowUpForm
        onClose={handleFormClose}
        existingFollowUp={editingFollowUp || undefined}
        type={editingFollowUp?.type || newItemType}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2 h-8 px-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-1">
          <Button onClick={() => handleAddNew('follow_up')} size="sm" className="gap-1 h-8">
            <Plus className="h-4 w-4" />
            Follow-Up
          </Button>
          <Button onClick={() => handleAddNew('appointment')} size="sm" variant="outline" className="gap-1 h-8">
            <Plus className="h-4 w-4" />
            Appointment
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="text-base">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasFollowUp: (date) => {
                  const dateKey = format(date, 'yyyy-MM-dd');
                  return !!datesWithFollowUps[dateKey]?.includes('follow_up');
                },
                hasAppointment: (date) => {
                  const dateKey = format(date, 'yyyy-MM-dd');
                  return !!datesWithFollowUps[dateKey]?.includes('appointment');
                }
              }}
              modifiersClassNames={{
                hasFollowUp: 'bg-blue-500/20 font-bold',
                hasAppointment: 'bg-purple-500/20 font-bold'
              }}
            />
            {/* Legend */}
            <div className="flex gap-4 text-xs mt-3 pt-2 border-t">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Follow-Up</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Appointment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="text-base">
              {format(selectedDate, 'EEE, MMM d')}
              {selectedDayFollowUps.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {selectedDayFollowUps.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            {loading ? (
              <div className="animate-pulse space-y-2">
                {[1, 2].map(i => (
                  <div key={i} className="h-12 bg-muted rounded" />
                ))}
              </div>
            ) : selectedDayFollowUps.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground text-sm mb-3">No events scheduled</p>
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleAddNew('follow_up')}>
                    <Plus className="h-4 w-4 mr-1" />
                    Follow-Up
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddNew('appointment')}>
                    <Plus className="h-4 w-4 mr-1" />
                    Appointment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedDayFollowUps.map((followUp) => (
                  <div
                    key={followUp.id}
                    className="p-2 rounded-md border bg-card"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${followUp.type === 'appointment' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                          <span className="font-medium text-sm truncate">
                            {followUp.title}
                          </span>
                          {followUp.is_recurring && (
                            <Badge variant="outline" className="text-xs">
                              {followUp.recurrence_interval}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground ml-4">
                          {format(new Date(followUp.scheduled_at), 'h:mm a')}
                        </p>
                        {followUp.lead && (
                          <p className="text-xs text-muted-foreground ml-4">
                            Lead: {followUp.lead.name}
                          </p>
                        )}
                        {followUp.notes && (
                          <p className="text-xs text-muted-foreground mt-1 ml-4 line-clamp-1">
                            {followUp.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => setEditingFollowUp(followUp)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(followUp.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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
