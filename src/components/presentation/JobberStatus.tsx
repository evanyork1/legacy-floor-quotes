import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const JOBBER_CLIENT_ID = 'a525f5fa-bc9f-43d4-8465-badf2721a1e6';
const REDIRECT_URI = 'https://byvazfrvoanojfayvsaz.supabase.co/functions/v1/jobber-oauth-callback';

export function JobberStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  useEffect(() => {
    checkConnection();
    
    // Check URL params for OAuth callback results
    const params = new URLSearchParams(window.location.search);
    const connected = params.get('connected');
    const error = params.get('error');
    
    if (connected === 'true') {
      toast.success('Successfully connected to Jobber!');
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
      checkConnection();
    } else if (error) {
      toast.error(`Jobber connection failed: ${error}`);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const checkConnection = async () => {
    try {
      // Use the edge function to check status (it will also refresh if needed)
      const { data, error } = await supabase.functions.invoke('jobber-api', {
        body: { action: 'checkStatus' },
      });

      if (error || data?.error) {
        setStatus('disconnected');
        return;
      }

      if (data?.connected) {
        setStatus('connected');
        if (data.expiresAt) {
          setExpiresAt(new Date(data.expiresAt));
        }
      } else {
        setStatus('disconnected');
      }
    } catch (err) {
      console.error('Error checking Jobber connection:', err);
      setStatus('disconnected');
    }
  };

  const handleConnect = () => {
    const authUrl = `https://api.getjobber.com/api/oauth/authorize?client_id=${JOBBER_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
    window.location.href = authUrl;
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
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span className="text-sm text-green-500">Jobber Connected</span>
        {expiresAt && (
          <span className="text-xs text-slate-500">
            (expires {expiresAt.toLocaleDateString()})
          </span>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleConnect}
      className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
    >
      <ExternalLink className="h-4 w-4 mr-2" />
      Connect to Jobber
    </Button>
  );
}
