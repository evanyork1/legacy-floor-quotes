-- Completely remove RLS from quotes_dfw table to allow all operations
ALTER TABLE public.quotes_dfw DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on quotes_dfw
DROP POLICY IF EXISTS "Allow admin access to read all DFW quotes" ON public.quotes_dfw;
DROP POLICY IF EXISTS "Allow admin access to update DFW quotes" ON public.quotes_dfw;
DROP POLICY IF EXISTS "Allow public access to create DFW quotes" ON public.quotes_dfw;