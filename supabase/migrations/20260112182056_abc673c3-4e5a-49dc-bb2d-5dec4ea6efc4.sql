-- Create table for storing Jobber OAuth tokens
CREATE TABLE public.jobber_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jobber_tokens ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access (edge functions use service role key)
-- No policies needed for authenticated users - this is backend-only

-- Create trigger for updated_at
CREATE TRIGGER update_jobber_tokens_updated_at
BEFORE UPDATE ON public.jobber_tokens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();