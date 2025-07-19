
-- Remove the failing database trigger that's causing the DFW submission error
DROP TRIGGER IF EXISTS dfwquotes_webhook_trigger ON public.dfwquotes;
DROP FUNCTION IF EXISTS trigger_dfw_webhook();
