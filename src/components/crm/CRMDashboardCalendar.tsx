import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { useCRM } from '@/hooks/useCRM';
import { CRMFollowUp } from '@/types/crm';
import { CRMFollowUpForm } from './CRMFollowUpForm';
import { toast } from 'sonner';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'follow_up' | 'appointment';
  followUp?: CRMFollowUp;
}

export function CRMDashboardCalendar() {
  const { fetchFollowUps, deleteFollowUp } = useCRM();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingFollowUp, setEditingFollowUp] = useState<CRMFollowUp | null>(null);
  const [showNewFollowUp, setShowNewFollowUp] = useState(false);
  const [newItemType, setNewItemType] = useState<'follow_up' | 'appointment'>('follow_up');

  useEffect(() => {
    loadEvents();
  }, [currentMonth]);

  const loadEvents = async () => {
    const followUps = await fetchFollowUps();
    const calendarEvents: CalendarEvent[] = followUps
      .filter(fu => !fu.completed)
      .map(fu => ({
        id: fu.id,
        title: fu.title,
        date: new Date(fu.scheduled_at),
        type: fu.type || 'follow_up',
        followUp: fu
      }));
    setEvents(calendarEvents);
  };

  const handleFormClose = () => {
    setEditingFollowUp(null);
    setShowNewFollowUp(false);
    loadEvents();
  };

  const handleDelete = async (id: string) => {
    const success = await deleteFollowUp(id);
    if (success) {
      toast.success('Deleted');
      loadEvents();
    } else {
      toast.error('Failed to delete');
    }
  };

  const handleAddNew = (type: 'follow_up' | 'appointment') => {
    setNewItemType(type);
    setShowNewFollowUp(true);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  const getDotColor = (type: CalendarEvent['type']) => {
    return type === 'appointment' ? 'bg-purple-500' : 'bg-blue-500';
  };

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  if (editingFollowUp) {
    return <CRMFollowUpForm onClose={handleFormClose} existingFollowUp={editingFollowUp} />;
  }

  if (showNewFollowUp) {
    return <CRMFollowUpForm onClose={handleFormClose} type={newItemType} />;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            My Calendar
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[100px] text-center">
              {format(currentMonth, 'MMM yyyy')}
            </span>
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-3 pb-3">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`
                  relative p-1 text-xs rounded transition-colors min-h-[36px]
                  ${!isCurrentMonth ? 'text-muted-foreground/40' : ''}
                  ${isToday(day) ? 'bg-primary/10 font-bold' : ''}
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                `}
              >
                <span>{format(day, 'd')}</span>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {dayEvents.slice(0, 2).map((event, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${getDotColor(event.type)}`}
                      />
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[7px] text-muted-foreground">+</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs border-t pt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Follow-Up</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Appointment</span>
          </div>
        </div>

        {/* Selected Day Events */}
        {selectedDate && (
          <div className="border-t pt-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium">
                {format(selectedDate, 'EEE, MMM d')}
              </h4>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={() => handleAddNew('follow_up')} className="h-6 text-xs px-2">
                  + Follow-Up
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleAddNew('appointment')} className="h-6 text-xs px-2">
                  + Appt
                </Button>
              </div>
            </div>
            {selectedDayEvents.length === 0 ? (
              <p className="text-xs text-muted-foreground">No events</p>
            ) : (
              <div className="space-y-1.5 max-h-28 overflow-y-auto">
                {selectedDayEvents.map(event => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-1.5 bg-muted/50 rounded text-xs"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getDotColor(event.type)}`} />
                      <span className="truncate">{event.title}</span>
                      <span className="text-muted-foreground shrink-0">
                        {format(event.date, 'h:mm a')}
                      </span>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => event.followUp && setEditingFollowUp(event.followUp)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
