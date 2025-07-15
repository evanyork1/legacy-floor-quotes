-- Add DFW webhook URL column to webhook_settings table
ALTER TABLE public.webhook_settings 
ADD COLUMN dfw_webhook_url TEXT;

-- Insert the DFW webhook URL
UPDATE public.webhook_settings 
SET dfw_webhook_url = 'https://hooks.zapier.com/hooks/catch/18144828/u21rmpg/'
WHERE id = 1;