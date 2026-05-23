-- Revoke EXECUTE on internal SECURITY DEFINER functions from public roles.
-- These functions are used by RLS policies and triggers, which run with elevated privileges
-- regardless of grants, so revoking does not break policy evaluation.
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_edit_content(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.prevent_role_self_escalation() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_contact_submission() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Restrict listing on storage.objects: only allow direct fetches by exact path, not bucket-wide listing.
-- We replace any broad permissive SELECT policy on public buckets with a no-op and rely on signed/known URLs.
-- Buckets remain "public" so direct URLs work, but anonymous users cannot enumerate contents.
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND cmd = 'SELECT'
      AND (qual ILIKE '%bucket_id%' AND (
        qual ILIKE '%gallery%' OR qual ILIKE '%team%' OR qual ILIKE '%events%'
        OR qual ILIKE '%hero-media%' OR qual ILIKE '%ambassadors%'
      ))
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;