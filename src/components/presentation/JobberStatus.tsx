import { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, Loader2, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const JOBBER_CLIENT_ID = 'a525f5fa-bc9f-43d4-8465-badf2721a1e6';
const REDIRECT_URI = 'https://byvazfrvoanojfayvsaz.supabase.co/functions/v1/jobber-oauth-callback';
const POLL_INTERVAL_MS = 60_000;

export function JobberStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    checkConnection();

    const params = new URLSearchParams(window.location.search);
    const connected = params.get('connected');
    const error = params.get('error');
    if (connected === 'true') {
      toast.success('Successfully connected to Jobber!');
      window.history.replaceState({}, '', window.location.pathname);
      checkConnection();
    } else if (error) {
      toast.error(`Jobber connection failed: ${error}`);
      window.history.replaceState({}, '', window.location.pathname);
    }

    const interval = setInterval(checkConnection, POLL_INTERVAL_MS);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('jobber-api', {
        body: { action: 'checkStatus' },
      });
      if (!mountedRef.current) return;

      if (error || data?.error || !data?.connected) {
        setStatus('disconnected');
        setExpiresAt(null);
        return;
      }
      setStatus('connected');
      setExpiresAt(data.expiresAt ? new Date(data.expiresAt) : null);
    } catch (err) {
      console.error('Error checking Jobber connection:', err);
      if (mountedRef.current) setStatus('disconnected');
    }
  };

  const handleConnect = () => {
    const authUrl = `https://api.getjobber.com/api/oauth/authorize?client_id=${JOBBER_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
    window.location.href = authUrl;
  };

  const handleForceRefresh = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('jobber-token-refresh', {
        body: { source: 'manual' },
      });
      if (error || !data?.ok) {
        toast.error('Refresh failed — try reconnecting.');
      } else {
        toast.success('Jobber token refreshed.');
        await checkConnection();
      }
    } finally {
      setRefreshing(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 text-slate-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Checking Jobber...</span>
      </div>
    );
  }

  if (status === 'connected') {
    const expired = expiresAt && expiresAt.getTime() < Date.now();
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className={`h-4 w-4 ${expired ? 'text-amber-500' : 'text-green-500'}`} />
        <span className={`text-sm ${expired ? 'text-amber-500' : 'text-green-500'}`}>
          Jobber {expired ? 'expiring' : 'Connected'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleForceRefresh}
          disabled={refreshing}
          className="h-7 px-2"
          title="Refresh Jobber token now"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <span className="text-sm text-red-500 font-medium">Jobber Disconnected</span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleConnect}
        className="border-red-500 text-red-600 hover:bg-red-50"
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Reconnect
      </Button>
    </div>
  );
}
