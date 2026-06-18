
-- Extend cms_pages
ALTER TABLE public.cms_pages
  ADD COLUMN IF NOT EXISTS seo_score INTEGER,
  ADD COLUMN IF NOT EXISTS seo_checklist JSONB,
  ADD COLUMN IF NOT EXISTS kind TEXT NOT NULL DEFAULT 'page',
  ADD COLUMN IF NOT EXISTS primary_keyword TEXT;

-- Generation logs
CREATE TABLE IF NOT EXISTS public.cms_generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  page_id UUID REFERENCES public.cms_pages(id) ON DELETE SET NULL,
  model TEXT NOT NULL,
  prompt TEXT NOT NULL,
  primary_keyword TEXT,
  tokens_input INTEGER,
  tokens_output INTEGER,
  status TEXT NOT NULL DEFAULT 'success',
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.cms_generation_logs TO authenticated;
GRANT ALL ON public.cms_generation_logs TO service_role;
ALTER TABLE public.cms_generation_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Editors can insert generation logs"
  ON public.cms_generation_logs FOR INSERT TO authenticated
  WITH CHECK (public.can_edit_content(auth.uid()) AND user_id = auth.uid());

CREATE POLICY "Admins can read generation logs"
  ON public.cms_generation_logs FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- Cron + http
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule the auto-publish job every 5 minutes
SELECT cron.schedule(
  'cms-publish-scheduled-every-5min',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://xysmiqehkvuifsubalyd.supabase.co/functions/v1/cms-publish-scheduled',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5c21pcWVoa3Z1aWZzdWJhbHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MDc0OTMsImV4cCI6MjA5MDQ4MzQ5M30.KULaDnWyGZZagV7oE92eWBYIzT3l2qRe6bWp7vSvFj0"}'::jsonb,
    body := '{"trigger":"cron"}'::jsonb
  );
  $$
);
