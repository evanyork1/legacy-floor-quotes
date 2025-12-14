-- Create follow-ups table
CREATE TABLE public.crm_follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  title TEXT NOT NULL,
  notes TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_interval TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.crm_follow_ups ENABLE ROW LEVEL SECURITY;

-- Users can view their own follow-ups
CREATE POLICY "Users can view their own follow-ups"
ON public.crm_follow_ups
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own follow-ups
CREATE POLICY "Users can insert their own follow-ups"
ON public.crm_follow_ups
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own follow-ups
CREATE POLICY "Users can update their own follow-ups"
ON public.crm_follow_ups
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own follow-ups
CREATE POLICY "Users can delete their own follow-ups"
ON public.crm_follow_ups
FOR DELETE
USING (auth.uid() = user_id);

-- Admins can view all follow-ups
CREATE POLICY "Admins can view all follow-ups"
ON public.crm_follow_ups
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_crm_follow_ups_updated_at
BEFORE UPDATE ON public.crm_follow_ups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();