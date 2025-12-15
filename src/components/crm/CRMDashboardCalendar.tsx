import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
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
  endOfWeek,
  isPast
} from 'date-fns';
import { useCRM } from '@/hooks/useCRM';
import { CRMFollowUp } from '@/types/crm';
import { CRMFollowUpForm } from './CRMFollowUpForm';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'follow-up' | 'overdue' | 'completed' | 'appointment';
  followUp?: CRMFollowUp;
}

export function CRMDashboardCalendar() {
  const { fetchFollowUps } = useCRM();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingFollowUp, setEditingFollowUp] = useState<CRMFollowUp | null>(null);
  const [showNewFollowUp, setShowNewFollowUp] = useState(false);

  useEffect(() => {
    loadEvents();
  }, [currentMonth]);

  const loadEvents = async () => {
    const followUps = await fetchFollowUps();
    const calendarEvents: CalendarEvent[] = followUps.map(fu => {
      const date = new Date(fu.scheduled_at);
      let type: CalendarEvent['type'] = 'follow-up';
      
      if (fu.completed) {
        type = 'completed';
      } else if (isPast(date) && !isToday(date)) {
        type = 'overdue';
      }

      return {
        id: fu.id,
        title: fu.title,
        date,
        type,
        followUp: fu
      };
    });
    setEvents(calendarEvents);
  };

  const handleFormClose = () => {
    setEditingFollowUp(null);
    setShowNewFollowUp(false);
    loadEvents();
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
    switch (type) {
      case 'overdue': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      case 'appointment': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  if (editingFollowUp) {
    return <CRMFollowUpForm onClose={handleFormClose} existingFollowUp={editingFollowUp} />;
  }

  if (showNewFollowUp) {
    return <CRMFollowUpForm onClose={handleFormClose} />;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            My Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-xs font-medium text-muted-foreground py-2">
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
                  relative p-2 text-sm rounded-md transition-colors min-h-[44px]
                  ${!isCurrentMonth ? 'text-muted-foreground/50' : ''}
                  ${isToday(day) ? 'bg-primary/10 font-bold' : ''}
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                `}
              >
                <span>{format(day, 'd')}</span>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${getDotColor(event.type)}`}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[8px] text-muted-foreground">+{dayEvents.length - 3}</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs border-t pt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Scheduled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Overdue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>Appointment</span>
          </div>
        </div>

        {/* Selected Day Events */}
        {selectedDate && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">
                {format(selectedDate, 'EEEE, MMMM d')}
              </h4>
              <Button variant="outline" size="sm" onClick={() => setShowNewFollowUp(true)}>
                Add Follow-Up
              </Button>
            </div>
            {selectedDayEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events scheduled</p>
            ) : (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedDayEvents.map(event => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-2 bg-muted/50 rounded-md cursor-pointer hover:bg-muted"
                    onClick={() => event.followUp && setEditingFollowUp(event.followUp)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getDotColor(event.type)}`} />
                      <span className="text-sm">{event.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {format(event.date, 'h:mm a')}
                      </span>
                      {event.type === 'completed' && (
                        <Badge variant="secondary" className="text-xs">Done</Badge>
                      )}
                      {event.type === 'overdue' && (
                        <Badge variant="destructive" className="text-xs">Overdue</Badge>
                      )}
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
