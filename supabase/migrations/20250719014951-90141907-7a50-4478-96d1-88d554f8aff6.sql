
-- Create a new table for DFW quotes
CREATE TABLE public.dfwquotes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  garage_type text NOT NULL,
  custom_sqft integer,
  space_type text,
  other_space_type text,
  color_choice text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  zip_code text NOT NULL,
  estimated_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'new'::text,
  lead_source text NOT NULL DEFAULT 'DFW'::text,
  archived boolean NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.dfwquotes ENABLE ROW LEVEL SECURITY;

-- Create policies for the dfwquotes table
CREATE POLICY "Allow public access to create DFW quotes" 
  ON public.dfwquotes 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow admin access to read all DFW quotes" 
  ON public.dfwquotes 
  FOR SELECT 
  USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Allow admin access to update DFW quotes" 
  ON public.dfwquotes 
  FOR UPDATE 
  USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Allow public read access to DFW quotes" 
  ON public.dfwquotes 
  FOR SELECT 
  USING (true);
