import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Plus, Calendar, Target } from 'lucide-react';
import { startOfWeek, endOfWeek, format } from 'date-fns';

interface ProspectingLog {
  id: string;
  contact_name: string;
  note: string;
  contacted_at: string;
  added_to_jobber: boolean;
}

export function ProspectingSection() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ProspectingLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [contactName, setContactName] = useState('');
  const [note, setNote] = useState('');
  const [weeklyCount, setWeeklyCount] = useState(0);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

  useEffect(() => {
    if (user) {
      fetchLogs();
      fetchWeeklyCount();
    }
  }, [user]);

  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from('prospecting_logs')
      .select('*')
      .eq('user_id', user?.id)
      .order('contacted_at', { ascending: false })
      .limit(10);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch prospecting logs',
        variant: 'destructive',
      });
      return;
    }

    setLogs(data || []);
  };

  const fetchWeeklyCount = async () => {
    const { data, error } = await supabase
      .from('prospecting_logs')
      .select('id')
      .eq('user_id', user?.id)
      .gte('contacted_at', format(weekStart, 'yyyy-MM-dd'))
      .lte('contacted_at', format(weekEnd, 'yyyy-MM-dd'));

    if (error) {
      console.error('Error fetching weekly count:', error);
      return;
    }

    setWeeklyCount(data?.length || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('prospecting_logs')
        .insert({
          user_id: user?.id,
          contact_name: contactName,
          note: note,
          contacted_at: format(new Date(), 'yyyy-MM-dd'),
        });

      if (error) throw error;

      setContactName('');
      setNote('');
      setShowForm(false);
      fetchLogs();
      fetchWeeklyCount();

      toast({
        title: 'Success',
        description: 'Contact logged successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log contact',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleJobber = async (logId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('prospecting_logs')
      .update({ added_to_jobber: !currentStatus })
      .eq('id', logId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update Jobber status',
        variant: 'destructive',
      });
      return;
    }

    fetchLogs();
  };

  const progressPercentage = (weeklyCount / 30) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Prospecting
            </CardTitle>
            <CardDescription>
              Track your daily contacts and build your pipeline
            </CardDescription>
          </div>
          <Button onClick={() => setShowForm(true)} disabled={showForm}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Weekly Progress</Label>
            <span className="text-sm text-muted-foreground">
              {weeklyCount}/30 contacts
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Week of {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d')}
          </p>
        </div>

        {/* Add Contact Form */}
        {showForm && (
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="contactName">Contact Name/Company</Label>
                  <Input
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="note">Notes</Label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Quick notes about the contact..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Contact'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Recent Contacts */}
        <div className="space-y-4">
          <h3 className="font-medium">Recent Contacts</h3>
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No contacts logged yet. Start building your pipeline!
            </p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-3 border rounded-lg bg-background"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{log.contact_name}</span>
                      <span className="text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {format(new Date(log.contacted_at), 'MMM d')}
                      </span>
                    </div>
                    {log.note && (
                      <p className="text-sm text-muted-foreground">{log.note}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={log.added_to_jobber}
                      onCheckedChange={() => toggleJobber(log.id, log.added_to_jobber)}
                    />
                    <Label className="text-xs">Added to Jobber</Label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}