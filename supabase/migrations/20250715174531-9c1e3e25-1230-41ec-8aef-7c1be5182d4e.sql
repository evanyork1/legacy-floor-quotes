-- Fix RLS policies for quotes_dfw table to allow public inserts
-- and ensure webhook_settings table has proper access

-- First, enable RLS on webhook_settings table if not already enabled
ALTER TABLE public.webhook_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies and recreate them cleanly
DROP POLICY IF EXISTS "Allow public read access to webhook settings" ON public.webhook_settings;
DROP POLICY IF EXISTS "Allow authenticated access to update webhook settings" ON public.webhook_settings;
DROP POLICY IF EXISTS "Allow public access to create DFW quotes" ON public.quotes_dfw;

-- Create policy to allow public read access to webhook_settings
CREATE POLICY "Allow public read access to webhook settings" 
ON public.webhook_settings 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to update webhook settings
CREATE POLICY "Allow authenticated access to update webhook settings" 
ON public.webhook_settings 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create new policy that definitely allows public inserts for DFW quotes
CREATE POLICY "Allow public access to create DFW quotes" 
ON public.quotes_dfw 
FOR INSERT 
WITH CHECK (true);