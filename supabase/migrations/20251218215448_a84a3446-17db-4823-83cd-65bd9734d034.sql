-- Add floor_packet_webhook_url column to webhook_settings
ALTER TABLE public.webhook_settings 
ADD COLUMN IF NOT EXISTS floor_packet_webhook_url text;