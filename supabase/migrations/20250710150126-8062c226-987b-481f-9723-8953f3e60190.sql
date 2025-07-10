-- Add location field to pricing_settings table
ALTER TABLE public.pricing_settings 
ADD COLUMN location TEXT NOT NULL DEFAULT 'Houston';

-- Update the existing row to be for Houston
UPDATE public.pricing_settings 
SET location = 'Houston' 
WHERE id = 1;

-- Insert a duplicate row for DFW
INSERT INTO public.pricing_settings (
  id, 
  price_per_sqft, 
  price_2_car, 
  price_3_car, 
  price_4_car, 
  location,
  updated_at
)
SELECT 
  2,
  price_per_sqft,
  price_2_car,
  price_3_car,
  price_4_car,
  'DFW',
  now()
FROM public.pricing_settings 
WHERE id = 1;