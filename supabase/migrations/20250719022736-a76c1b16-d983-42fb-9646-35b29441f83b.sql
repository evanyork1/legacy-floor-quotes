
-- Create a trigger function that calls the edge function when a new DFW quote is inserted
CREATE OR REPLACE FUNCTION trigger_dfw_webhook()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function with the new row data
  PERFORM net.http_post(
    url := 'https://byvazfrvoanojfayvsaz.supabase.co/functions/v1/dfw-webhook-trigger',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5dmF6ZnJ2b2Fub2pmYXl2c2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjQ4ODAsImV4cCI6MjA2NTUwMDg4MH0._UYJK6diQbMMlh-_uhDtgiyBq_Ama6Qd-NYQkugbfHc"}'::jsonb,
    body := to_jsonb(NEW)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger that fires after INSERT on dfwquotes
CREATE OR REPLACE TRIGGER dfwquotes_webhook_trigger
  AFTER INSERT ON public.dfwquotes
  FOR EACH ROW
  EXECUTE FUNCTION trigger_dfw_webhook();
