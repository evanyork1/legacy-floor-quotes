
-- ============================================================
-- SECURITY HARDENING MIGRATION
-- Locks down PII, prevents anonymous tampering, no data deleted
-- ============================================================

-- ---------- Lead Form Subissions ----------
DROP POLICY IF EXISTS "Admins can view all leads" ON public."Lead Form Subissions";
CREATE POLICY "Admins can view all leads (real)"
  ON public."Lead Form Subissions" FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---------- quotes ----------
DROP POLICY IF EXISTS "Allow public read access to quotes" ON public.quotes;
DROP POLICY IF EXISTS "Allow admin access to read all quotes" ON public.quotes;
CREATE POLICY "Admins can read all quotes"
  ON public.quotes FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---------- dfwquotes ----------
DROP POLICY IF EXISTS "Allow public read access to DFW quotes" ON public.dfwquotes;
DROP POLICY IF EXISTS "Allow admin access to read all DFW quotes" ON public.dfwquotes;
CREATE POLICY "Admins can read all DFW quotes"
  ON public.dfwquotes FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---------- floor_packets ----------
-- Public SELECT stays (shared link by UUID is the access token), but
-- restrict UPDATE to ONLY toggling ready_to_proceed = true.
DROP POLICY IF EXISTS "Anyone can update ready_to_proceed" ON public.floor_packets;

CREATE OR REPLACE FUNCTION public.floor_packets_guard_public_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Authenticated admins may change anything
  IF auth.role() = 'authenticated' AND public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  -- Anonymous callers may only flip ready_to_proceed from false to true.
  -- Every other column must be unchanged.
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
    RAISE EXCEPTION 'Only ready_to_proceed may be modified by anonymous users';
  END IF;

  IF NEW.ready_to_proceed IS NOT TRUE THEN
    RAISE EXCEPTION 'ready_to_proceed may only be set to true';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS floor_packets_guard_public_update ON public.floor_packets;
CREATE TRIGGER floor_packets_guard_public_update
  BEFORE UPDATE ON public.floor_packets
  FOR EACH ROW
  EXECUTE FUNCTION public.floor_packets_guard_public_update();

-- Re-add a permissive UPDATE policy now that the trigger enforces column-level safety
CREATE POLICY "Public can confirm ready_to_proceed"
  ON public.floor_packets FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ---------- gallery_photos ----------
DROP POLICY IF EXISTS "Allow public gallery photo uploads" ON public.gallery_photos;
DROP POLICY IF EXISTS "Allow public gallery photo updates" ON public.gallery_photos;
DROP POLICY IF EXISTS "Allow public gallery photo deletes" ON public.gallery_photos;
-- Keep "Allow public read access" + "Allow admin access to manage gallery photos"

-- ---------- sales_presentations ----------
-- Lock down "Anyone can sign presentations" (UPDATE USING true)
-- so anonymous users can only sign UNSIGNED presentations and only
-- touch signature/status/package columns.
DROP POLICY IF EXISTS "Anyone can sign presentations" ON public.sales_presentations;

CREATE OR REPLACE FUNCTION public.sales_presentations_guard_public_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Owner/admin may edit freely
  IF auth.uid() IS NOT NULL AND (auth.uid() = OLD.created_by OR public.has_role(auth.uid(), 'admin')) THEN
    RETURN NEW;
  END IF;

  -- Anonymous: must be unsigned
  IF OLD.signed_at IS NOT NULL THEN
    RAISE EXCEPTION 'Signed presentations cannot be modified';
  END IF;

  -- Anonymous: only allow touching these specific columns
  IF NEW.client_id              IS DISTINCT FROM OLD.client_id              OR
     NEW.client_name            IS DISTINCT FROM OLD.client_name            OR
     NEW.client_email           IS DISTINCT FROM OLD.client_email           OR
     NEW.client_phone           IS DISTINCT FROM OLD.client_phone           OR
     NEW.client_address         IS DISTINCT FROM OLD.client_address         OR
     NEW.space_type             IS DISTINCT FROM OLD.space_type             OR
     NEW.square_footage         IS DISTINCT FROM OLD.square_footage         OR
     NEW.moisture_content       IS DISTINCT FROM OLD.moisture_content       OR
     NEW.color_choice           IS DISTINCT FROM OLD.color_choice           OR
     NEW.custom_color_note      IS DISTINCT FROM OLD.custom_color_note      OR
     NEW.warranty_type          IS DISTINCT FROM OLD.warranty_type          OR
     NEW.custom_warranty_note   IS DISTINCT FROM OLD.custom_warranty_note   OR
     NEW.deposit_type           IS DISTINCT FROM OLD.deposit_type           OR
     NEW.custom_deposit_amount  IS DISTINCT FROM OLD.custom_deposit_amount  OR
     NEW.presentation_notes     IS DISTINCT FROM OLD.presentation_notes     OR
     NEW.silver_total           IS DISTINCT FROM OLD.silver_total           OR
     NEW.gold_total             IS DISTINCT FROM OLD.gold_total             OR
     NEW.platinum_total         IS DISTINCT FROM OLD.platinum_total         OR
     NEW.line_items             IS DISTINCT FROM OLD.line_items             OR
     NEW.site_photos            IS DISTINCT FROM OLD.site_photos            OR
     NEW.created_by             IS DISTINCT FROM OLD.created_by             OR
     NEW.created_at             IS DISTINCT FROM OLD.created_at             THEN
    RAISE EXCEPTION 'Anonymous users may only sign or mark presentation viewed';
  END IF;

  -- Status transitions allowed for anonymous: pending -> viewed, or -> signed
  IF NEW.status NOT IN ('pending','viewed','signed') THEN
    RAISE EXCEPTION 'Invalid status for anonymous update';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sales_presentations_guard_public_update ON public.sales_presentations;
CREATE TRIGGER sales_presentations_guard_public_update
  BEFORE UPDATE ON public.sales_presentations
  FOR EACH ROW
  EXECUTE FUNCTION public.sales_presentations_guard_public_update();

CREATE POLICY "Public can sign or view-mark presentations"
  ON public.sales_presentations FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ---------- webhook_settings ----------
-- Webhook URLs should not be readable by every authenticated user (rep, etc.)
DROP POLICY IF EXISTS "Allow public read access to webhook settings" ON public.webhook_settings;
DROP POLICY IF EXISTS "Allow authenticated access to update webhook settings" ON public.webhook_settings;
CREATE POLICY "Admins can read webhook settings"
  ON public.webhook_settings FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update webhook settings"
  ON public.webhook_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---------- pricing_settings & location_pricing ----------
-- Pricing tables are read by the public quote calculators, so SELECT must stay public.
-- Tighten UPDATE to admins only.
DROP POLICY IF EXISTS "Allow admin access to update pricing" ON public.pricing_settings;
CREATE POLICY "Admins can update pricing"
  ON public.pricing_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Allow admin access to update location pricing" ON public.location_pricing;
CREATE POLICY "Admins can update location pricing"
  ON public.location_pricing FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---------- commercial_submissions ----------
DROP POLICY IF EXISTS "Allow admin access to read all commercial submissions" ON public.commercial_submissions;
DROP POLICY IF EXISTS "Allow admin access to update commercial submissions" ON public.commercial_submissions;
CREATE POLICY "Admins can read commercial submissions"
  ON public.commercial_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update commercial submissions"
  ON public.commercial_submissions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---------- giveaway ----------
DROP POLICY IF EXISTS "Authenticated users can read giveaway entries" ON public.giveaway;
DROP POLICY IF EXISTS "Authenticated users can update giveaway entries" ON public.giveaway;
CREATE POLICY "Admins can read giveaway entries"
  ON public.giveaway FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update giveaway entries"
  ON public.giveaway FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ---------- visualizer_analytics ----------
DROP POLICY IF EXISTS "Authenticated users can read visualizer events" ON public.visualizer_analytics;
CREATE POLICY "Admins can read visualizer events"
  ON public.visualizer_analytics FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
