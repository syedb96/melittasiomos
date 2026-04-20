-- 1) contact_submissions: explicit admin SELECT policy
DROP POLICY IF EXISTS "Admins can read contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can read contact submissions"
  ON public.contact_submissions FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- 2) profiles: harden role immutability via trigger (closes race-condition gap)
DROP POLICY IF EXISTS "Users can update own profile (no role change)" ON public.profiles;

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.prevent_role_self_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.has_role(auth.uid(), 'owner'::public.app_role) THEN
      RAISE EXCEPTION 'Only owners can change user roles';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_role_self_escalation_trigger ON public.profiles;
CREATE TRIGGER prevent_role_self_escalation_trigger
  BEFORE UPDATE OF role ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_self_escalation();