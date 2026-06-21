-- Sprint 0 hardening: use self-scoped role helpers in RLS policies.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE user_id = auth.uid()
        AND role IN ('owner', 'admin')
    )
$$;

CREATE OR REPLACE FUNCTION public.can_edit_content()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE user_id = auth.uid()
        AND role IN ('owner', 'admin', 'editor')
    )
$$;

CREATE OR REPLACE FUNCTION public.has_role(_role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL
    AND _role IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE user_id = auth.uid()
        AND role = _role
    )
$$;

DO $$
DECLARE
  pol record;
  new_qual text;
  new_check text;
  stmt text;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname, qual, with_check
    FROM pg_policies
    WHERE schemaname = 'public'
      AND (
        coalesce(qual, '') ILIKE '%is_admin(auth.uid())%'
        OR coalesce(qual, '') ILIKE '%can_edit_content(auth.uid())%'
        OR coalesce(qual, '') ILIKE '%has_role(auth.uid()%'
        OR coalesce(with_check, '') ILIKE '%is_admin(auth.uid())%'
        OR coalesce(with_check, '') ILIKE '%can_edit_content(auth.uid())%'
        OR coalesce(with_check, '') ILIKE '%has_role(auth.uid()%'
      )
  LOOP
    new_qual := pol.qual;
    new_check := pol.with_check;

    IF new_qual IS NOT NULL THEN
      new_qual := replace(new_qual, 'is_admin(auth.uid())', 'is_admin()');
      new_qual := replace(new_qual, 'can_edit_content(auth.uid())', 'can_edit_content()');
      new_qual := replace(new_qual, 'has_role(auth.uid(), ''owner''::app_role)', 'has_role(''owner''::app_role)');
      new_qual := replace(new_qual, 'has_role(auth.uid(), ''admin''::app_role)', 'has_role(''admin''::app_role)');
      new_qual := replace(new_qual, 'has_role(auth.uid(), ''editor''::app_role)', 'has_role(''editor''::app_role)');
      new_qual := replace(new_qual, 'has_role(auth.uid(), ''viewer''::app_role)', 'has_role(''viewer''::app_role)');
    END IF;

    IF new_check IS NOT NULL THEN
      new_check := replace(new_check, 'is_admin(auth.uid())', 'is_admin()');
      new_check := replace(new_check, 'can_edit_content(auth.uid())', 'can_edit_content()');
      new_check := replace(new_check, 'has_role(auth.uid(), ''owner''::app_role)', 'has_role(''owner''::app_role)');
      new_check := replace(new_check, 'has_role(auth.uid(), ''admin''::app_role)', 'has_role(''admin''::app_role)');
      new_check := replace(new_check, 'has_role(auth.uid(), ''editor''::app_role)', 'has_role(''editor''::app_role)');
      new_check := replace(new_check, 'has_role(auth.uid(), ''viewer''::app_role)', 'has_role(''viewer''::app_role)');
    END IF;

    stmt := format('ALTER POLICY %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
    IF new_qual IS NOT NULL THEN
      stmt := stmt || ' USING (' || new_qual || ')';
    END IF;
    IF new_check IS NOT NULL THEN
      stmt := stmt || ' WITH CHECK (' || new_check || ')';
    END IF;
    EXECUTE stmt;
  END LOOP;
END $$;

-- Keep old argument-taking signatures available only to trusted backend roles, not browser sessions.
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_edit_content(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.can_edit_content(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- Browser-facing helper signatures are self-scoped to auth.uid().
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_edit_content() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role(public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_edit_content() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(public.app_role) TO authenticated, service_role;