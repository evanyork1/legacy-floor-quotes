import { useState, useEffect } from 'react';
import { AlertTriangle, RotateCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Failure {
  id: string;
  packet_id: string | null;
  error: string;
  created_at: string;
  resolved: boolean;
}

export function JobberSyncFailuresBanner() {
  const [failures, setFailures] = useState<Failure[]>([]);
  const [retrying, setRetrying] = useState<string | null>(null);
  const [backfilling, setBackfilling] = useState(false);

  const load = async () => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { data } = await supabase
      .from('jobber_sync_failures')
      .select('*')
      .eq('resolved', false)
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: false })
      .limit(50);
    setFailures(data || []);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 30_000);
    return () => clearInterval(t);
  }, []);

  const retry = async (f: Failure) => {
    if (!f.packet_id) {
      toast.error('No packet ID on this failure — cannot retry.');
      return;
    }
    setRetrying(f.id);
    try {
      const { data, error } = await supabase.functions.invoke('jobber-quote-from-packet', {
        body: { action: 'retry', packet_id: f.packet_id },
      });
      if (error || (data as any)?.error) {
        toast.error('Retry failed — check Jobber connection.');
      } else {
        await supabase.from('jobber_sync_failures').update({ resolved: true }).eq('id', f.id);
        toast.success('Packet synced to Jobber.');
        load();
      }
    } finally {
      setRetrying(null);
    }
  };

  const dismiss = async (f: Failure) => {
    await supabase.from('jobber_sync_failures').update({ resolved: true }).eq('id', f.id);
    load();
  };

  const backfill = async () => {
    setBackfilling(true);
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data: packets } = await supabase
        .from('floor_packets')
        .select('id')
        .is('jobber_client_id', null)
        .gte('created_at', thirtyDaysAgo)
        .order('created_at', { ascending: false })
        .limit(50);
      if (!packets?.length) {
        toast.info('No missing packets to backfill.');
        return;
      }
      let ok = 0;
      let fail = 0;
      for (const p of packets) {
        const { data, error } = await supabase.functions.invoke('jobber-quote-from-packet', {
          body: { action: 'retry', packet_id: p.id },
        });
        if (error || (data as any)?.error) fail++;
        else ok++;
      }
      toast.success(`Backfill complete: ${ok} synced, ${fail} failed.`);
      load();
    } finally {
      setBackfilling(false);
    }
  };

  if (failures.length === 0) {
    return (
      <div className="mb-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={backfill} disabled={backfilling}>
          <RotateCw className={`h-3.5 w-3.5 mr-2 ${backfilling ? 'animate-spin' : ''}`} />
          Backfill missed Jobber leads (30d)
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-4 border border-red-300 bg-red-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-semibold text-sm">
            {failures.length} packet{failures.length === 1 ? '' : 's'} failed to sync to Jobber
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={backfill} disabled={backfilling}>
          <RotateCw className={`h-3.5 w-3.5 mr-2 ${backfilling ? 'animate-spin' : ''}`} />
          Retry all (30d)
        </Button>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {failures.slice(0, 10).map((f) => (
          <div key={f.id} className="flex items-center justify-between text-xs bg-white rounded px-2 py-1.5 border border-red-100">
            <div className="flex-1 min-w-0">
              <div className="font-mono text-slate-500 truncate">
                {new Date(f.created_at).toLocaleString()} · {f.packet_id?.slice(0, 8) || 'no-packet'}
              </div>
              <div className="text-red-700 truncate">{f.error}</div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => retry(f)}
                disabled={retrying === f.id || !f.packet_id}
                className="h-7 px-2"
              >
                <RotateCw className={`h-3 w-3 ${retrying === f.id ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => dismiss(f)} className="h-7 px-2">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
