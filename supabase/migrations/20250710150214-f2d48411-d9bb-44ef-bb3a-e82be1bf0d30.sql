-- Add location field to pricing_settings table
ALTER TABLE public.pricing_settings 
ADD COLUMN location TEXT NOT NULL DEFAULT 'Houston';

-- Create a new table for location-specific pricing
CREATE TABLE public.location_pricing (
  id BIGSERIAL PRIMARY KEY,
  location TEXT NOT NULL UNIQUE,
  price_per_sqft NUMERIC NOT NULL DEFAULT 8,
  price_2_car NUMERIC NOT NULL DEFAULT 3400,
  price_3_car NUMERIC NOT NULL DEFAULT 5200,
  price_4_car NUMERIC NOT NULL DEFAULT 7200,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on the new table
ALTER TABLE public.location_pricing ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to location pricing"
ON public.location_pricing
FOR SELECT
USING (true);

-- Create policy for admin updates
CREATE POLICY "Allow admin access to update location pricing"
ON public.location_pricing
FOR UPDATE
USING (auth.role() = 'authenticated');

-- Insert pricing data for both locations
INSERT INTO public.location_pricing (location, price_per_sqft, price_2_car, price_3_car, price_4_car)
VALUES 
  ('Houston', 8, 3400, 5200, 7200),
  ('DFW', 8, 3400, 5200, 7200);