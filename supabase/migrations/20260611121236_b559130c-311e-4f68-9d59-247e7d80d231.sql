-- Remove the unusable ip_hint column (browser cannot read its own IP)
ALTER TABLE public.security_events DROP COLUMN IF EXISTS ip_hint;

-- Enable scheduling extensions (no-op if already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Retention purge function — deletes security_events older than 90 days
CREATE OR REPLACE FUNCTION public.purge_old_security_events()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.security_events WHERE created_at < now() - interval '90 days';
$$;

-- Daily cron at 03:15 UTC
DO $$
BEGIN
  PERFORM cron.unschedule('purge-security-events-daily');
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

SELECT cron.schedule(
  'purge-security-events-daily',
  '15 3 * * *',
  $$ SELECT public.purge_old_security_events(); $$
);