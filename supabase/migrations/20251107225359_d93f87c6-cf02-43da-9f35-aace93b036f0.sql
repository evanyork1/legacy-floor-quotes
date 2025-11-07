-- Create giveaway table
CREATE TABLE public.giveaway (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  referred_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE public.giveaway ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert
CREATE POLICY "Anyone can submit giveaway entries"
ON public.giveaway
FOR INSERT
WITH CHECK (true);

-- Create policies for authenticated read
CREATE POLICY "Authenticated users can read giveaway entries"
ON public.giveaway
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create policies for authenticated update
CREATE POLICY "Authenticated users can update giveaway entries"
ON public.giveaway
FOR UPDATE
USING (auth.role() = 'authenticated');