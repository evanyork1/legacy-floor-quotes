-- Fix security warning: Set search_path for the function
CREATE OR REPLACE FUNCTION public.mark_session_converted()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.event_type = 'lead_submitted' THEN
    UPDATE public.visualizer_analytics
    SET converted = true
    WHERE session_id = NEW.session_id;
  END IF;
  RETURN NEW;
END;
$$;