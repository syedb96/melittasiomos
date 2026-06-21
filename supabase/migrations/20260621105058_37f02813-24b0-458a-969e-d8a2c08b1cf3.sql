-- Freshness alerts table
CREATE TABLE public.cms_freshness_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  digest_run_id uuid NOT NULL,
  page_id uuid NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  freshness text NOT NULL CHECK (freshness IN ('fresh','review_soon','outdated')),
  review_date date,
  published_at timestamptz,
  days_overdue integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_cms_freshness_alerts_run ON public.cms_freshness_alerts(digest_run_id, freshness);
CREATE INDEX idx_cms_freshness_alerts_page ON public.cms_freshness_alerts(page_id, created_at DESC);

GRANT SELECT ON public.cms_freshness_alerts TO authenticated;
GRANT ALL ON public.cms_freshness_alerts TO service_role;

ALTER TABLE public.cms_freshness_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and editors can read freshness alerts"
  ON public.cms_freshness_alerts FOR SELECT
  TO authenticated
  USING (public.can_edit_content());

-- Daily freshness digest cron (06:15 UTC)
SELECT cron.schedule(
  'cms-freshness-digest-daily',
  '15 6 * * *',
  $$
  SELECT net.http_post(
    url := 'https://xysmiqehkvuifsubalyd.supabase.co/functions/v1/cms-freshness-digest',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);