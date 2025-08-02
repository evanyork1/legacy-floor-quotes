-- Insert or update the lead webhook URL in webhook_settings
INSERT INTO webhook_settings (id, lead_webhook_url) 
VALUES (1, 'https://hooks.zapier.com/hooks/catch/18144828/u4rb4wq/')
ON CONFLICT (id) DO UPDATE SET 
lead_webhook_url = EXCLUDED.lead_webhook_url,
updated_at = now();