
-- Create a table to store webhook settings
CREATE TABLE public.webhook_settings (
  id int8 NOT NULL DEFAULT 1,
  zapier_webhook_url text,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT webhook_settings_pkey PRIMARY KEY (id),
  CONSTRAINT webhook_settings_singleton CHECK (id = 1)
);

-- Comment on table
COMMENT ON TABLE public.webhook_settings IS 'Stores webhook configuration for quote notifications. Should only contain one row.';

-- Insert the single row for webhook settings
INSERT INTO public.webhook_settings (id, zapier_webhook_url)
VALUES (1, null)
ON CONFLICT (id) DO NOTHING;

-- RLS for webhook_settings table
ALTER TABLE public.webhook_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access for webhook settings (needed by edge function)
CREATE POLICY "Allow public read access for webhook settings"
ON public.webhook_settings
FOR SELECT
USING (true);

-- Allow authenticated users to update webhook settings (for admin panel)
CREATE POLICY "Allow admin access to update webhook settings"
ON public.webhook_settings
FOR UPDATE
USING (auth.role() = 'authenticated');
