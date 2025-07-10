-- Create commercial_submissions table for contact requests
CREATE TABLE public.commercial_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  project_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new'::text
);

-- Enable Row Level Security
ALTER TABLE public.commercial_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for commercial submissions
CREATE POLICY "Allow public access to create commercial submissions" 
ON public.commercial_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin access to read all commercial submissions" 
ON public.commercial_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Allow admin access to update commercial submissions" 
ON public.commercial_submissions 
FOR UPDATE 
USING (auth.role() = 'authenticated'::text);