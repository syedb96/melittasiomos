-- 1) Add application_status to ambassadors
ALTER TABLE public.ambassadors
  ADD COLUMN IF NOT EXISTS application_status text NOT NULL DEFAULT 'approved';

ALTER TABLE public.ambassadors
  DROP CONSTRAINT IF EXISTS ambassadors_application_status_check;

ALTER TABLE public.ambassadors
  ADD CONSTRAINT ambassadors_application_status_check
  CHECK (application_status IN ('pending', 'approved', 'rejected'));

-- Tighten public read: only published AND approved ambassadors are public
DROP POLICY IF EXISTS "Published ambassadors are public" ON public.ambassadors;
CREATE POLICY "Published approved ambassadors are public"
  ON public.ambassadors
  FOR SELECT
  TO public
  USING (is_published = true AND application_status = 'approved');

-- 2) Storage bucket for ambassador photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('ambassadors', 'ambassadors', true)
ON CONFLICT (id) DO NOTHING;

-- Public read of ambassador photos
DROP POLICY IF EXISTS "Public read ambassador photos" ON storage.objects;
CREATE POLICY "Public read ambassador photos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'ambassadors');

-- Editors+ can upload
DROP POLICY IF EXISTS "Editors can upload ambassador photos" ON storage.objects;
CREATE POLICY "Editors can upload ambassador photos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'ambassadors' AND public.can_edit_content(auth.uid()));

-- Editors+ can update
DROP POLICY IF EXISTS "Editors can update ambassador photos" ON storage.objects;
CREATE POLICY "Editors can update ambassador photos"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'ambassadors' AND public.can_edit_content(auth.uid()));

-- Admins can delete
DROP POLICY IF EXISTS "Admins can delete ambassador photos" ON storage.objects;
CREATE POLICY "Admins can delete ambassador photos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'ambassadors' AND public.is_admin(auth.uid()));