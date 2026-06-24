
-- Lead Form Subissions
DROP POLICY IF EXISTS "Anyone can submit leads" ON public."Lead Form Subissions";
CREATE POLICY "Anyone can submit leads"
  ON public."Lead Form Subissions"
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    "email" IS NOT NULL AND length(btrim("email")) > 0
  );

-- commercial_submissions
DROP POLICY IF EXISTS "Allow public access to create commercial submissions" ON public.commercial_submissions;
CREATE POLICY "Allow public access to create commercial submissions"
  ON public.commercial_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(btrim(email)) > 0
  );

-- dfwquotes
DROP POLICY IF EXISTS "Allow public access to create DFW quotes" ON public.dfwquotes;
CREATE POLICY "Allow public access to create DFW quotes"
  ON public.dfwquotes
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(btrim(email)) > 0
  );

-- floor_packets
DROP POLICY IF EXISTS "Anyone can create floor packets" ON public.floor_packets;
CREATE POLICY "Anyone can create floor packets"
  ON public.floor_packets
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(btrim(email)) > 0
    AND name IS NOT NULL AND length(btrim(name)) > 0
    AND phone IS NOT NULL AND length(btrim(phone)) > 0
  );

-- giveaway
DROP POLICY IF EXISTS "Anyone can submit giveaway entries" ON public.giveaway;
CREATE POLICY "Anyone can submit giveaway entries"
  ON public.giveaway
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(btrim(email)) > 0
  );

-- quotes
DROP POLICY IF EXISTS "Allow public access to create quotes" ON public.quotes;
CREATE POLICY "Allow public access to create quotes"
  ON public.quotes
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(btrim(email)) > 0
  );

-- visualizer_analytics
DROP POLICY IF EXISTS "Anyone can insert visualizer events" ON public.visualizer_analytics;
CREATE POLICY "Anyone can insert visualizer events"
  ON public.visualizer_analytics
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    session_id IS NOT NULL AND length(btrim(session_id)) > 0
    AND event_type IS NOT NULL AND length(btrim(event_type)) > 0
  );

-- quote_photos storage: tighten WITH CHECK with a path/length sanity rule
DROP POLICY IF EXISTS "Public upload quote photos" ON storage.objects;
CREATE POLICY "Public upload quote photos"
  ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    bucket_id = 'quote_photos'
    AND name IS NOT NULL
    AND length(name) > 0
    AND length(name) < 1024
  );
