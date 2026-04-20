
-- ============ PROFILES: restrict SELECT ============
DROP POLICY IF EXISTS "Users can read all profiles" ON public.profiles;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- ============ PROFILES: prevent role escalation ============
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Users can update their own profile, but cannot change their role
CREATE POLICY "Users can update own profile (no role change)"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND role = (SELECT role FROM public.profiles WHERE user_id = auth.uid())
  );

-- Only owners can change roles
CREATE POLICY "Owners can update any profile including role"
  ON public.profiles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'owner'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'owner'::public.app_role));

-- ============ SITE_SETTINGS: restrict reads to admins ============
DROP POLICY IF EXISTS "Anyone can read settings" ON public.site_settings;

CREATE POLICY "Admins can read settings"
  ON public.site_settings FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- ============ STORAGE: prevent public listing of buckets ============
-- Restrict listing on public buckets; direct file access by URL still works.
DROP POLICY IF EXISTS "Public read access for gallery" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for team" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for events" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for hero-media" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
