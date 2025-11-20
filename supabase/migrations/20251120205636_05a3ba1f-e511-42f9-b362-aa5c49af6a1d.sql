-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to trigger lead webhook via edge function
CREATE OR REPLACE FUNCTION public.trigger_lead_webhook()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Make async HTTP request to edge function
  -- This won't block the insert operation
  PERFORM net.http_post(
    url := 'https://byvazfrvoanojfayvsaz.supabase.co/functions/v1/send-lead-webhook',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5dmF6ZnJ2b2Fub2pmYXl2c2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjQ4ODAsImV4cCI6MjA2NTUwMDg4MH0._UYJK6diQbMMlh-_uhDtgiyBq_Ama6Qd-NYQkugbfHc'
    ),
    body := jsonb_build_object(
      'first_name', NEW.first_name,
      'last_name', NEW.last_name,
      'email', NEW.email,
      'phone', NEW.phone,
      'questions_comments', COALESCE(NEW.questions_comments, ''),
      'privacy_policy_agreed', NEW.privacy_policy_agreed
    )
  );
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error but don't fail the insert
  RAISE WARNING 'Failed to trigger lead webhook: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- Create trigger on Lead Form Subissions table
DROP TRIGGER IF EXISTS on_lead_form_submission ON public."Lead Form Subissions";

CREATE TRIGGER on_lead_form_submission
  AFTER INSERT ON public."Lead Form Subissions"
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_lead_webhook();