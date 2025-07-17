-- Add missing RLS policies to quotes_dfw table for admin access
CREATE POLICY "Allow admin access to read all DFW quotes" 
ON public.quotes_dfw 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin access to update DFW quotes" 
ON public.quotes_dfw 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin access to delete DFW quotes" 
ON public.quotes_dfw 
FOR DELETE 
USING (auth.role() = 'authenticated');