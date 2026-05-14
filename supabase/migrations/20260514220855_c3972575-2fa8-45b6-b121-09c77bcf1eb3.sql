
-- SEO snapshot tables
CREATE TABLE public.seo_gsc_daily (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site text NOT NULL,
  date date NOT NULL,
  clicks integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  ctr numeric NOT NULL DEFAULT 0,
  position numeric NOT NULL DEFAULT 0,
  indexed_pages integer,
  submitted_pages integer,
  captured_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(site, date)
);

CREATE TABLE public.seo_sitemap_snapshot (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site text NOT NULL,
  sitemap_path text NOT NULL,
  captured_at timestamptz NOT NULL DEFAULT now(),
  last_submitted timestamptz,
  submitted integer,
  indexed integer,
  errors integer DEFAULT 0,
  warnings integer DEFAULT 0,
  urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  added_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  removed_urls jsonb NOT NULL DEFAULT '[]'::jsonb
);
CREATE INDEX idx_sitemap_snap_site_path_time ON public.seo_sitemap_snapshot(site, sitemap_path, captured_at DESC);

CREATE TABLE public.seo_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site text NOT NULL,
  metric text NOT NULL,
  severity text NOT NULL DEFAULT 'warning',
  current_value numeric NOT NULL,
  baseline_value numeric NOT NULL,
  delta_pct numeric NOT NULL,
  message text NOT NULL,
  emailed boolean NOT NULL DEFAULT false,
  acknowledged boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_seo_alerts_created ON public.seo_alerts(created_at DESC);

ALTER TABLE public.seo_gsc_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_sitemap_snapshot ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_alerts ENABLE ROW LEVEL SECURITY;

-- Admin/editor read; service role writes (no policy needed for service role)
CREATE POLICY "Editors can read gsc daily" ON public.seo_gsc_daily
  FOR SELECT TO authenticated
  USING (public.can_edit_content(auth.uid()));

CREATE POLICY "Editors can read sitemap snapshots" ON public.seo_sitemap_snapshot
  FOR SELECT TO authenticated
  USING (public.can_edit_content(auth.uid()));

CREATE POLICY "Editors can read seo alerts" ON public.seo_alerts
  FOR SELECT TO authenticated
  USING (public.can_edit_content(auth.uid()));

CREATE POLICY "Admins can ack alerts" ON public.seo_alerts
  FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
