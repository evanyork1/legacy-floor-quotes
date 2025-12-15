-- Add type column to crm_follow_ups to support both follow-ups and appointments
ALTER TABLE public.crm_follow_ups 
ADD COLUMN type text NOT NULL DEFAULT 'follow_up';

-- Add comment for clarity
COMMENT ON COLUMN public.crm_follow_ups.type IS 'Type of entry: follow_up or appointment';