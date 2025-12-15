import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Clock, AlertTriangle, Pencil } from 'lucide-react';
import { format, isToday, isPast, isBefore, startOfDay } from 'date-fns';
import { useCRM } from '@/hooks/useCRM';
import { CRMFollowUp } from '@/types/crm';
import { CRMFollowUpForm } from './CRMFollowUpForm';
import { toast } from 'sonner';

interface CRMFollowUpsTodayProps {
  onViewCalendar?: () => void;
}

export function CRMFollowUpsToday({ onViewCalendar }: CRMFollowUpsTodayProps) {
  const { fetchFollowUps, completeFollowUp } = useCRM();
  const [followUps, setFollowUps] = useState<CRMFollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFollowUp, setEditingFollowUp] = useState<CRMFollowUp | null>(null);

  useEffect(() => {
    loadFollowUps();
  }, []);

  const loadFollowUps = async () => {
    try {
      const data = await fetchFollowUps();
      // Filter to today's and overdue, not completed
      const relevant = data.filter(fu => {
        if (fu.completed) return false;
        const scheduledDate = new Date(fu.scheduled_at);
        return isToday(scheduledDate) || isBefore(scheduledDate, startOfDay(new Date()));
      });
      setFollowUps(relevant.sort((a, b) => 
        new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
      ));
    } catch (error) {
      console.error('Failed to load follow-ups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await completeFollowUp(id);
      setFollowUps(prev => prev.filter(fu => fu.id !== id));
      toast.success('Follow-up completed!');
    } catch (error) {
      toast.error('Failed to complete follow-up');
    }
  };

  const handleEditClose = () => {
    setEditingFollowUp(null);
    loadFollowUps();
  };

  const isOverdue = (scheduledAt: string) => {
    const date = new Date(scheduledAt);
    return isPast(date) && !isToday(date);
  };

  if (editingFollowUp) {
    return <CRMFollowUpForm onClose={handleEditClose} existingFollowUp={editingFollowUp} />;
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse h-20 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  const overdueCount = followUps.filter(fu => isOverdue(fu.scheduled_at)).length;

  return (
    <Card className={overdueCount > 0 ? 'border-destructive' : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Follow-Ups Today
            {followUps.length > 0 && (
              <Badge variant={overdueCount > 0 ? 'destructive' : 'secondary'}>
                {followUps.length}
              </Badge>
            )}
          </CardTitle>
          {onViewCalendar && (
            <Button variant="ghost" size="sm" onClick={onViewCalendar}>
              View Calendar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {followUps.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">
            No follow-ups scheduled for today
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {followUps.map((followUp) => {
              const overdue = isOverdue(followUp.scheduled_at);
              return (
                <div
                  key={followUp.id}
                  className={`flex items-center justify-between p-2 rounded-md border ${
                    overdue ? 'bg-destructive/10 border-destructive' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {overdue ? (
                        <AlertTriangle className="h-3 w-3 text-destructive flex-shrink-0" />
                      ) : (
                        <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-sm font-medium truncate">
                        {followUp.title}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground ml-5">
                      {format(new Date(followUp.scheduled_at), 'h:mm a')}
                      {followUp.lead && ` • ${followUp.lead.name}`}
                      {overdue && <span className="text-destructive ml-1">(Overdue)</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => setEditingFollowUp(followUp)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => handleComplete(followUp.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
