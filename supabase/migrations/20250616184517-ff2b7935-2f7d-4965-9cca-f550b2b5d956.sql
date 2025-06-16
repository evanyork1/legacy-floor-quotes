
-- Drop existing RLS policies on webhook_settings table
DROP POLICY IF EXISTS "Allow public read access for webhook settings" ON public.webhook_settings;
DROP POLICY IF EXISTS "Allow admin access to update webhook settings" ON public.webhook_settings;

-- Disable Row Level Security entirely on webhook_settings table
ALTER TABLE public.webhook_settings DISABLE ROW LEVEL SECURITY;
