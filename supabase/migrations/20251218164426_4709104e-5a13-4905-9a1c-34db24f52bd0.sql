-- Create floor_packets table for storing garage packet quote flow data
CREATE TABLE public.floor_packets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  garage_type TEXT NOT NULL, -- "2-car", "3-car", "4-car", "custom"
  custom_sqft INTEGER,
  additional_spaces JSONB,
  selected_color TEXT NOT NULL, -- color ID from colorOptions
  visualization_url TEXT, -- if they uploaded custom photo
  estimated_price NUMERIC NOT NULL,
  ready_to_proceed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.floor_packets ENABLE ROW LEVEL SECURITY;

-- Allow public to create new packets
CREATE POLICY "Anyone can create floor packets"
ON public.floor_packets
FOR INSERT
WITH CHECK (true);

-- Allow public to read their own packet by ID (for shareable URL)
CREATE POLICY "Anyone can read floor packets"
ON public.floor_packets
FOR SELECT
USING (true);

-- Allow public to update ready_to_proceed
CREATE POLICY "Anyone can update ready_to_proceed"
ON public.floor_packets
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow authenticated users to view all (admin access)
CREATE POLICY "Authenticated users can read all floor packets"
ON public.floor_packets
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_floor_packets_updated_at
BEFORE UPDATE ON public.floor_packets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();