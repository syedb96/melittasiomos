CREATE OR REPLACE FUNCTION public.provision_my_profile()
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

  SELECT LOWER(email),
         COALESCE(raw_app_meta_data->>'provider', 'email')
    INTO _email, _provider
    FROM auth.users WHERE id = _uid;

  IF _email IS NULL THEN
    RAISE EXCEPTION 'No email on session';
  END IF;

  SELECT default_role INTO _approved_role
    FROM public.approved_admin_emails
   WHERE LOWER(email) = _email AND is_active = true;

  _final_role := COALESCE(_approved_role, 'viewer');

  INSERT INTO public.profiles (user_id, email, role, provider)
  VALUES (_uid, _email, _final_role, _provider)
  ON CONFLICT (user_id) DO UPDATE
    SET email = EXCLUDED.email,
        -- only PROMOTE if the approved list says so; never silently downgrade
        role = CASE
                 WHEN _approved_role IS NOT NULL THEN _approved_role
                 ELSE public.profiles.role
               END,
        updated_at = now();

  RETURN _final_role;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.provision_my_profile() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.provision_my_profile() TO authenticated;