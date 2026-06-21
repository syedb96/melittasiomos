
REVOKE EXECUTE ON FUNCTION public.stamp_audit_actor() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.stamp_audit_actor() FROM anon;
REVOKE EXECUTE ON FUNCTION public.stamp_audit_actor() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.stamp_audit_actor() TO service_role;
