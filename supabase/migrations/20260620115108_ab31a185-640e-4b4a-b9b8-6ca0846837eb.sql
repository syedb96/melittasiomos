DROP POLICY IF EXISTS "Public can read settings" ON public.cms_settings;
REVOKE SELECT ON public.cms_settings FROM anon;
CREATE POLICY "Admins read settings" ON public.cms_settings FOR SELECT USING (public.is_admin(auth.uid()));