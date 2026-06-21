DROP POLICY IF EXISTS "Users can insert their own audit row" ON public.admin_audit_log;
CREATE POLICY "Editors and admins insert their own audit rows"
ON public.admin_audit_log
FOR INSERT
TO authenticated
WITH CHECK (actor_id = auth.uid() AND public.can_edit_content(auth.uid()));

DROP POLICY IF EXISTS "Public can read media" ON public.cms_media;
CREATE POLICY "Editors can read media"
ON public.cms_media
FOR SELECT
TO authenticated
USING (public.can_edit_content(auth.uid()));