-- Create table for shareable sales presentations
CREATE TABLE public.sales_presentations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Client info
  client_id TEXT,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  client_address TEXT,
  
  -- Project details
  space_type TEXT NOT NULL DEFAULT 'Garage',
  square_footage INTEGER NOT NULL,
  moisture_content NUMERIC DEFAULT 3,
  
  -- Color
  color_choice TEXT NOT NULL,
  custom_color_note TEXT,
  
  -- Line items as JSON array
  line_items JSONB DEFAULT '[]'::jsonb,
  
  -- Warranty selection
  warranty_type TEXT NOT NULL DEFAULT 'lifetime', -- lifetime, 15year, custom
  custom_warranty_note TEXT,
  
  -- Deposit settings
  deposit_type TEXT NOT NULL DEFAULT '50', -- 10, 50, 100, custom
  custom_deposit_amount NUMERIC,
  
  -- Presentation notes (disclaimers for customer to sign)
  presentation_notes TEXT,
  
  -- Pricing for each package
  silver_total NUMERIC NOT NULL,
  gold_total NUMERIC NOT NULL,
  platinum_total NUMERIC NOT NULL,
  
  -- Customer selection (filled when customer chooses)
  selected_package TEXT, -- silver, gold, platinum
  selected_deposit_amount NUMERIC,
  
  -- Status and signatures
  status TEXT NOT NULL DEFAULT 'pending', -- pending, viewed, signed, paid
  signature_data TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,
  agreement_accepted BOOLEAN DEFAULT FALSE,
  
  -- Created by rep
  created_by UUID REFERENCES public.profiles(id),
  
  -- Site photos (URLs)
  site_photos TEXT[] DEFAULT '{}'::TEXT[]
);

-- Enable RLS
ALTER TABLE public.sales_presentations ENABLE ROW LEVEL SECURITY;

-- Policies: Reps can CRUD their own presentations
CREATE POLICY "Reps can view their own presentations" 
ON public.sales_presentations 
FOR SELECT 
USING (auth.uid() = created_by);

CREATE POLICY "Reps can create presentations" 
ON public.sales_presentations 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Reps can update their own presentations" 
ON public.sales_presentations 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Public can view presentations by ID (for shareable links)
CREATE POLICY "Anyone can view presentations by ID" 
ON public.sales_presentations 
FOR SELECT 
USING (true);

-- Anyone can update presentation for signature (limited fields handled in app)
CREATE POLICY "Anyone can sign presentations" 
ON public.sales_presentations 
FOR UPDATE 
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_sales_presentations_created_by ON public.sales_presentations(created_by);
CREATE INDEX idx_sales_presentations_status ON public.sales_presentations(status);

-- Trigger for updated_at
CREATE TRIGGER update_sales_presentations_updated_at
BEFORE UPDATE ON public.sales_presentations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();