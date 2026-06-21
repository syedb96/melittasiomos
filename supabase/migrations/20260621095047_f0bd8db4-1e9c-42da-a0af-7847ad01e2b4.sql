-- Sprint 0: repair admin role helper execution permissions and owner provisioning.

-- Recreate the role helpers with an explicit secure context and schema-qualified objects.
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _user_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE user_id = _user_id
        AND role IN ('owner', 'admin')
    )
$$;

CREATE OR REPLACE FUNCTION public.can_edit_content(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _user_id IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE user_id = _user_id
        AND role IN ('owner', 'admin', 'editor')
    )
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _user_id IS NOT NULL
    AND _role IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- Anonymous visitors must not execute role helpers directly.
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_edit_content(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

-- Authenticated users need EXECUTE because these helpers are referenced by RLS policies.
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_edit_content(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Keep profile provisioning callable only by signed-in users.
REVOKE EXECUTE ON FUNCTION public.provision_my_profile() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.provision_my_profile() TO authenticated, service_role;

-- Ensure the permanent owner allow-list is canonical and active.
INSERT INTO public.approved_admin_emails (email, default_role, is_active)
VALUES
  ('syedbiz96@gmail.com', 'owner', true),
  ('puranights@gmail.com', 'owner', true)
ON CONFLICT (email) DO UPDATE
SET default_role = 'owner',
    is_active = true,
    email = lower(trim(EXCLUDED.email));

-- Promote existing authenticated accounts only by their real auth user IDs.
UPDATE public.profiles p
SET role = 'owner',
    email = lower(trim(u.email)),
    updated_at = now()
FROM auth.users u
WHERE p.user_id = u.id
  AND lower(trim(u.email)) IN ('syedbiz96@gmail.com', 'puranights@gmail.com')
  AND p.role IS DISTINCT FROM 'owner';

-- Provision missing profiles for already-existing owner auth accounts.
INSERT INTO public.profiles (user_id, email, full_name, avatar_url, role, provider)
SELECT
  u.id,
  lower(trim(u.email)),
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''),
  COALESCE(u.raw_user_meta_data->>'avatar_url', ''),
  'owner'::public.app_role,
  COALESCE(u.raw_app_meta_data->>'provider', 'email')
FROM auth.users u
WHERE lower(trim(u.email)) IN ('syedbiz96@gmail.com', 'puranights@gmail.com')
  AND NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.user_id = u.id
  );