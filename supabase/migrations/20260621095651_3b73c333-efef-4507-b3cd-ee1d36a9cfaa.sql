-- Sprint 0 lockdown: move SECURITY DEFINER role helpers out of the exposed public API schema.

CREATE SCHEMA IF NOT EXISTS app_private;
REVOKE ALL ON SCHEMA app_private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA app_private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION app_private.is_admin()
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

CREATE OR REPLACE FUNCTION app_private.can_edit_content()
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

CREATE OR REPLACE FUNCTION app_private.has_role(_role public.app_role)
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

CREATE OR REPLACE FUNCTION app_private.provision_my_profile()
RETURNS public.app_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _email text;
  _provider text;
  _approved_role public.app_role;
  _final_role public.app_role;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT LOWER(TRIM(email)),
         COALESCE(raw_app_meta_data->>'provider', 'email')
    INTO _email, _provider
    FROM auth.users WHERE id = _uid;

  IF _email IS NULL THEN
    RAISE EXCEPTION 'No email on session';
  END IF;

  SELECT default_role INTO _approved_role
    FROM public.approved_admin_emails
   WHERE LOWER(TRIM(email)) = _email AND is_active = true;

  _final_role := COALESCE(_approved_role, 'viewer');

  INSERT INTO public.profiles (user_id, email, role, provider)
  VALUES (_uid, _email, _final_role, _provider)
  ON CONFLICT (user_id) DO UPDATE
    SET email = EXCLUDED.email,
        role = CASE
                 WHEN _approved_role IS NOT NULL THEN _approved_role
                 ELSE public.profiles.role
               END,
        updated_at = now();

  RETURN _final_role;
END;
$$;

REVOKE EXECUTE ON FUNCTION app_private.is_admin() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION app_private.can_edit_content() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION app_private.has_role(public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION app_private.provision_my_profile() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION app_private.is_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION app_private.can_edit_content() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION app_private.has_role(public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION app_private.provision_my_profile() TO authenticated, service_role;

-- Public wrapper remains the stable API endpoint used by AuthContext, but is not SECURITY DEFINER.
CREATE OR REPLACE FUNCTION public.provision_my_profile()
RETURNS public.app_role
LANGUAGE sql
SECURITY INVOKER
SET search_path = public, app_private
AS $$
  SELECT app_private.provision_my_profile()
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
        coalesce(qual, '') ILIKE '%is_admin()%'
        OR coalesce(qual, '') ILIKE '%can_edit_content()%'
        OR coalesce(qual, '') ILIKE '%has_role(%'
        OR coalesce(with_check, '') ILIKE '%is_admin()%'
        OR coalesce(with_check, '') ILIKE '%can_edit_content()%'
        OR coalesce(with_check, '') ILIKE '%has_role(%'
      )
  LOOP
    new_qual := pol.qual;
    new_check := pol.with_check;

    IF new_qual IS NOT NULL THEN
      new_qual := replace(new_qual, 'is_admin()', 'app_private.is_admin()');
      new_qual := replace(new_qual, 'can_edit_content()', 'app_private.can_edit_content()');
      new_qual := replace(new_qual, 'has_role(', 'app_private.has_role(');
    END IF;

    IF new_check IS NOT NULL THEN
      new_check := replace(new_check, 'is_admin()', 'app_private.is_admin()');
      new_check := replace(new_check, 'can_edit_content()', 'app_private.can_edit_content()');
      new_check := replace(new_check, 'has_role(', 'app_private.has_role(');
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

-- Exposed public helper functions must not be directly callable by browser roles.
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_edit_content() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_edit_content(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.provision_my_profile() TO authenticated, service_role;