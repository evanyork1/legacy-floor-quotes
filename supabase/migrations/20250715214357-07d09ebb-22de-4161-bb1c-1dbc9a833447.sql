-- Add missing RLS policy to quotes_dfw table to allow public inserts
CREATE POLICY "Allow public access to create DFW quotes" 
ON public.quotes_dfw 
FOR INSERT 
WITH CHECK (true);