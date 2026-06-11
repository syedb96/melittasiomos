REVOKE EXECUTE ON FUNCTION public.purge_old_security_events() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_old_security_events() TO service_role, postgres;