
-- Enable extensions for scheduled Jobber token refresh
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Table: jobber_sync_failures (admin-visible; failures logged from edge functions)
CREATE TABLE IF NOT EXISTS public.jobber_sync_failures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  packet_id UUID,
  error TEXT NOT NULL,
  context JSONB,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.jobber_sync_failures TO authenticated;
GRANT ALL ON public.jobber_sync_failures TO service_role;

ALTER TABLE public.jobber_sync_failures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view sync failures"
  ON public.jobber_sync_failures FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sync failures"
  ON public.jobber_sync_failures FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_jobber_sync_failures_updated_at
  BEFORE UPDATE ON public.jobber_sync_failures
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Table: jobber_token_recovery (safety net if a refresh succeeded but DB write failed)
CREATE TABLE IF NOT EXISTS public.jobber_token_recovery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.jobber_token_recovery TO authenticated;
GRANT ALL ON public.jobber_token_recovery TO service_role;

ALTER TABLE public.jobber_token_recovery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view token recovery"
  ON public.jobber_token_recovery FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
