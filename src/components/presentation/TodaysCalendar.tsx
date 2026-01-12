import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CalendarEntry {
  id: string;
  title: string;
  clientName: string;
  clientId: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  startTime: string;
  endTime?: string;
  type: 'quote' | 'job' | 'visit';
}

interface TodaysCalendarProps {
  onSelectClient: (client: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  }) => void;
}

export function TodaysCalendar({ onSelectClient }: TodaysCalendarProps) {
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodaysCalendar = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('jobber-api', {
        body: { action: 'getTodaysCalendar' },
      });
      
      // Check for auth/connection errors
      if (error) {
        console.error('Calendar fetch error:', error);
        setError('Could not connect to Jobber - please check connection');
        return;
      }
      
      // Check if response indicates not connected
      if (data?.connected === false || data?.error) {
        console.error('Jobber not connected:', data?.error);
        setError(data?.error || 'Jobber connection expired - please reconnect');
        return;
      }
      
      // Transform the response into calendar entries
      const calendarEntries: CalendarEntry[] = [];
      
      // Process quotes
      if (data?.quotes?.nodes) {
        data.quotes.nodes.forEach((quote: any) => {
          if (quote.client) {
            calendarEntries.push({
              id: quote.id,
              title: quote.title || `Quote #${quote.quoteNumber}`,
              clientName: quote.client.name || `${quote.client.firstName} ${quote.client.lastName}`,
              clientId: quote.client.id,
              clientEmail: quote.client.emails?.[0]?.address,
              clientPhone: quote.client.phones?.[0]?.number,
              clientAddress: quote.client.billingAddress?.street1,
              startTime: quote.createdAt,
              type: 'quote',
            });
          }
        });
      }
      
      // Process jobs/visits
      if (data?.jobs?.nodes) {
        data.jobs.nodes.forEach((job: any) => {
          if (job.client) {
            calendarEntries.push({
              id: job.id,
              title: job.title || `Job #${job.jobNumber}`,
              clientName: job.client.name || `${job.client.firstName} ${job.client.lastName}`,
              clientId: job.client.id,
              clientEmail: job.client.emails?.[0]?.address,
              clientPhone: job.client.phones?.[0]?.number,
              clientAddress: job.client.billingAddress?.street1,
              startTime: job.startAt || job.createdAt,
              type: 'job',
            });
          }
        });
      }
      
      // Sort by time
      calendarEntries.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      
      setEntries(calendarEntries);
    } catch (err) {
      console.error('Failed to fetch calendar:', err);
      setError('Could not load calendar - check Jobber connection');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysCalendar();
  }, []);

  const handleSelectEntry = (entry: CalendarEntry) => {
    onSelectClient({
      id: entry.clientId,
      name: entry.clientName,
      email: entry.clientEmail,
      phone: entry.clientPhone,
      address: entry.clientAddress,
    });
    toast.success(`Selected ${entry.clientName}`);
  };

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '';
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-400" />
            <span>Today's Calendar</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchTodaysCalendar}
            disabled={isLoading}
            className="text-slate-400 hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-orange-400" />
            <span className="ml-2 text-slate-400">Loading calendar...</span>
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <p className="text-slate-400 text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchTodaysCalendar}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-6 text-slate-400">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No appointments scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleSelectEntry(entry)}
                className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors border border-transparent hover:border-orange-500/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-orange-400 flex-shrink-0" />
                      <span className="font-medium text-white truncate">{entry.clientName}</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{entry.title}</div>
                    {entry.clientAddress && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{entry.clientAddress}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 ml-2">
                    <Clock className="h-3 w-3" />
                    {formatTime(entry.startTime)}
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    entry.type === 'quote' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {entry.type === 'quote' ? 'Quote' : 'Job'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
