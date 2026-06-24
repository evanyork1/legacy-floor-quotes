
-- 1) floor_packets
DROP POLICY IF EXISTS "Anyone can read floor packets" ON public.floor_packets;
DROP POLICY IF EXISTS "Authenticated users can read all floor packets" ON public.floor_packets;
DROP POLICY IF EXISTS "Public can confirm ready_to_proceed" ON public.floor_packets;
DROP TRIGGER IF EXISTS floor_packets_guard_public_update_trg ON public.floor_packets;
DROP TRIGGER IF EXISTS floor_packets_guard_public_update ON public.floor_packets;

CREATE POLICY "Admins can read floor packets" ON public.floor_packets
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update floor packets" ON public.floor_packets
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete floor packets" ON public.floor_packets
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2) sales_presentations
DROP POLICY IF EXISTS "Anyone can view presentations by ID" ON public.sales_presentations;
DROP POLICY IF EXISTS "Public can sign or view-mark presentations" ON public.sales_presentations;
DROP TRIGGER IF EXISTS sales_presentations_guard_public_update_trg ON public.sales_presentations;
DROP TRIGGER IF EXISTS sales_presentations_guard_public_update ON public.sales_presentations;

CREATE POLICY "Admins can view all presentations" ON public.sales_presentations
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update any presentation" ON public.sales_presentations
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3) blog_posts
DROP POLICY IF EXISTS "Service role can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Service role can insert posts" ON public.blog_posts;

CREATE POLICY "Admins can insert posts" ON public.blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update posts" ON public.blog_posts
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete posts" ON public.blog_posts
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 4) dfwquotes
DROP POLICY IF EXISTS "Allow admin access to update DFW quotes" ON public.dfwquotes;

CREATE POLICY "Admins can update DFW quotes" ON public.dfwquotes
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 5) quotes
DROP POLICY IF EXISTS "Allow admin access to update quotes" ON public.quotes;

CREATE POLICY "Admins can update quotes" ON public.quotes
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 6) gallery_photos
DROP POLICY IF EXISTS "Allow admin access to manage gallery photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Allow public read access for gallery photos" ON public.gallery_photos;

CREATE POLICY "Admins manage gallery photos" ON public.gallery_photos
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 7) storage.objects
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads for gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates to gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes for gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads for quote_photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads to quote_photos" ON storage.objects;

CREATE POLICY "Admins upload gallery images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins update gallery images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins delete gallery images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Public upload quote photos" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'quote_photos');

-- 8) jobber_tokens
GRANT ALL ON public.jobber_tokens TO service_role;
REVOKE ALL ON public.jobber_tokens FROM anon, authenticated;

CREATE POLICY "Only admins can view jobber tokens" ON public.jobber_tokens
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 9) SECURITY DEFINER function executable rights
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.mark_session_converted() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trigger_lead_webhook() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.floor_packets_guard_public_update() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sales_presentations_guard_public_update() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.get_prospecting_leaderboard(date, date) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_sales_leaderboard(date, date) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_crm_leaderboard(date, date) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.check_duplicate_lead(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_prospecting_leaderboard(date, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_sales_leaderboard(date, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_crm_leaderboard(date, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_duplicate_lead(text, text) TO authenticated;

-- 10) Move pg_net out of public (drop and recreate; the `net` schema where
-- its functions live is recreated automatically by the extension).
CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions TO postgres, service_role;
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION pg_net WITH SCHEMA extensions;
