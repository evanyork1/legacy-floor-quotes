
ALTER TABLE public.floor_packets
  ADD COLUMN IF NOT EXISTS jobber_client_id text,
  ADD COLUMN IF NOT EXISTS jobber_property_id text,
  ADD COLUMN IF NOT EXISTS jobber_quote_id text,
  ADD COLUMN IF NOT EXISTS jobber_quote_url text;

CREATE OR REPLACE FUNCTION public.floor_packets_guard_public_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.role() = 'authenticated' AND public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  IF NEW.name              IS DISTINCT FROM OLD.name              OR
     NEW.email             IS DISTINCT FROM OLD.email             OR
     NEW.phone             IS DISTINCT FROM OLD.phone             OR
     NEW.garage_type       IS DISTINCT FROM OLD.garage_type       OR
     NEW.estimated_price   IS DISTINCT FROM OLD.estimated_price   OR
     NEW.visualization_url IS DISTINCT FROM OLD.visualization_url OR
     NEW.selected_color    IS DISTINCT FROM OLD.selected_color    OR
     NEW.additional_spaces IS DISTINCT FROM OLD.additional_spaces OR
     NEW.custom_sqft       IS DISTINCT FROM OLD.custom_sqft       OR
     NEW.created_at        IS DISTINCT FROM OLD.created_at        THEN
    RAISE EXCEPTION 'Only ready_to_proceed, address, deposit, and jobber sync fields may be modified by anonymous users';
  END IF;

  IF NEW.ready_to_proceed IS DISTINCT FROM OLD.ready_to_proceed
     AND NEW.ready_to_proceed IS NOT TRUE THEN
    RAISE EXCEPTION 'ready_to_proceed may only be set to true';
  END IF;

  IF NEW.deposit_requested IS DISTINCT FROM OLD.deposit_requested
     AND NEW.deposit_requested IS NOT TRUE THEN
    RAISE EXCEPTION 'deposit_requested may only be set to true';
  END IF;

  RETURN NEW;
END;
$function$;
