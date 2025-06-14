
-- Create table for quotes/leads
CREATE TABLE public.quotes (
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
  status text NOT NULL DEFAULT 'new'
);

-- Comment on table
COMMENT ON TABLE public.quotes IS 'Stores all quote submissions from the website.';

-- Create table for pricing settings
CREATE TABLE public.pricing_settings (
  id int8 NOT NULL DEFAULT 1,
  price_per_sqft numeric NOT NULL DEFAULT 8,
  price_2_car numeric NOT NULL DEFAULT 3400,
  price_3_car numeric NOT NULL DEFAULT 5200,
  price_4_car numeric NOT NULL DEFAULT 7200,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT pricing_settings_pkey PRIMARY KEY (id),
  CONSTRAINT pricing_settings_singleton CHECK (id = 1)
);

-- Comment on table
COMMENT ON TABLE public.pricing_settings IS 'Stores pricing configuration for the quote calculator. Should only contain one row.';

-- Insert the single row for pricing settings with default values
INSERT INTO public.pricing_settings (id, price_per_sqft, price_2_car, price_3_car, price_4_car)
VALUES (1, 8, 3400, 5200, 7200)
ON CONFLICT (id) DO NOTHING;


-- RLS for quotes table
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous access to create quotes
CREATE POLICY "Allow public access to create quotes"
ON public.quotes
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to read all quotes (for admin panel)
CREATE POLICY "Allow admin access to read all quotes"
ON public.quotes
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin access to update quotes"
ON public.quotes
FOR UPDATE
USING (auth.role() = 'authenticated');


-- RLS for pricing_settings table
ALTER TABLE public.pricing_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access for pricing settings
CREATE POLICY "Allow public read access for pricing"
ON public.pricing_settings
FOR SELECT
USING (true);

-- Allow authenticated users to update pricing (for admin panel)
CREATE POLICY "Allow admin access to update pricing"
ON public.pricing_settings
FOR UPDATE
USING (auth.role() = 'authenticated');


-- Create a storage bucket for quote photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('quote_photos', 'quote_photos', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage bucket
CREATE POLICY "Allow public uploads to quote_photos"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'quote_photos');

CREATE POLICY "Allow public reads for quote_photos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'quote_photos');
