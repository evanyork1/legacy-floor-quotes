
-- Create a new table for DFW quotes with identical structure to existing quotes table
CREATE TABLE public.quotes_dfw (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  garage_type text NOT NULL,
  custom_sqft integer,
  space_type text,
  other_space_type text,
  exterior_photos text[], -- Storing URLs of uploaded photos
  damage_photos text[], -- Storing URLs of uploaded photos
  color_choice text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  zip_code text NOT NULL,
  estimated_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'new',
  archived boolean NOT NULL DEFAULT false,
  lead_source text NOT NULL DEFAULT 'DFW'
);

-- Add lead_source column to existing quotes table for Houston tracking
ALTER TABLE public.quotes 
ADD COLUMN IF NOT EXISTS lead_source text NOT NULL DEFAULT 'Houston';

-- Comment on table
COMMENT ON TABLE public.quotes_dfw IS 'Stores all quote submissions from the DFW website pages.';

-- RLS for quotes_dfw table
ALTER TABLE public.quotes_dfw ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous access to create quotes
CREATE POLICY "Allow public access to create DFW quotes"
ON public.quotes_dfw
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to read all quotes (for admin panel)
CREATE POLICY "Allow admin access to read all DFW quotes"
ON public.quotes_dfw
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin access to update DFW quotes"
ON public.quotes_dfw
FOR UPDATE
USING (auth.role() = 'authenticated');
