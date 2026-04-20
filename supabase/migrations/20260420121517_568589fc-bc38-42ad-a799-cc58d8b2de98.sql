
-- Restrict bucket listing (was: any anon could list every file in public buckets)
DROP POLICY IF EXISTS "Gallery images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Team images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Event images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Hero media is publicly accessible" ON storage.objects;

CREATE POLICY "Admins can list gallery files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'gallery' AND public.can_edit_content(auth.uid()));

CREATE POLICY "Admins can list team files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'team' AND public.can_edit_content(auth.uid()));

CREATE POLICY "Admins can list event files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'events' AND public.can_edit_content(auth.uid()));

CREATE POLICY "Admins can list hero media files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'hero-media' AND public.can_edit_content(auth.uid()));

-- Tighten INSERT policies (previously had no WITH CHECK expression)
DROP POLICY IF EXISTS "Editors can upload to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Editors can upload to team" ON storage.objects;
DROP POLICY IF EXISTS "Editors can upload to events" ON storage.objects;
DROP POLICY IF EXISTS "Editors can upload hero media" ON storage.objects;

CREATE POLICY "Editors can upload to gallery"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery' AND public.can_edit_content(auth.uid()));

CREATE POLICY "Editors can upload to team"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'team' AND public.can_edit_content(auth.uid()));

CREATE POLICY "Editors can upload to events"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'events' AND public.can_edit_content(auth.uid()));

CREATE POLICY "Editors can upload hero media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'hero-media' AND public.can_edit_content(auth.uid()));
