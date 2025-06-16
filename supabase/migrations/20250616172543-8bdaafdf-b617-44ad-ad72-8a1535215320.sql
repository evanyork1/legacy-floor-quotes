
-- Create RLS policy to allow public read access to quotes for admin panel
CREATE POLICY "Allow public read access to quotes"
ON public.quotes
FOR SELECT
USING (true);

-- Create RLS policy to allow public read access to pricing_settings for admin panel  
CREATE POLICY "Allow public read access to pricing_settings"
ON public.pricing_settings
FOR SELECT
USING (true);
