-- Add lead webhook URL column to webhook_settings table
ALTER TABLE public.webhook_settings 
ADD COLUMN lead_webhook_url TEXT;