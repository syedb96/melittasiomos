
-- Wix sync + media + link-suggestion columns on cms_pages
ALTER TABLE public.cms_pages
  ADD COLUMN IF NOT EXISTS wix_post_id TEXT,
  ADD COLUMN IF NOT EXISTS wix_collection_item_id TEXT,
  ADD COLUMN IF NOT EXISTS wix_synced_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS wix_sync_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS wix_sync_error TEXT,
  ADD COLUMN IF NOT EXISTS wix_auto_sync BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS hero_image_alt TEXT,
  ADD COLUMN IF NOT EXISTS og_image_generated_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS twitter_image TEXT,
  ADD COLUMN IF NOT EXISTS related_slugs TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS topic TEXT;

CREATE INDEX IF NOT EXISTS cms_pages_wix_sync_status_idx ON public.cms_pages(wix_sync_status) WHERE wix_auto_sync = true;
CREATE INDEX IF NOT EXISTS cms_pages_city_topic_idx ON public.cms_pages(city, topic);
CREATE INDEX IF NOT EXISTS cms_pages_tags_idx ON public.cms_pages USING GIN(tags);

-- Wix sync log table
CREATE TABLE IF NOT EXISTS public.cms_wix_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  status TEXT NOT NULL,
  request_summary JSONB,
  response_summary JSONB,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_wix_sync_log TO authenticated;
GRANT ALL ON public.cms_wix_sync_log TO service_role;
ALTER TABLE public.cms_wix_sync_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "editors_read_sync_log" ON public.cms_wix_sync_log FOR SELECT TO authenticated
  USING (public.can_edit_content(auth.uid()));
CREATE INDEX IF NOT EXISTS cms_wix_sync_log_page_idx ON public.cms_wix_sync_log(page_id, created_at DESC);

-- Wix site configuration (one row, owner-managed)
CREATE TABLE IF NOT EXISTS public.cms_wix_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wix_site_id TEXT,
  wix_blog_member_id TEXT,
  wix_collection_id TEXT,
  auto_push_enabled BOOLEAN NOT NULL DEFAULT true,
  last_reconcile_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_wix_config TO authenticated;
GRANT ALL ON public.cms_wix_config TO service_role;
ALTER TABLE public.cms_wix_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "editors_read_wix_config" ON public.cms_wix_config FOR SELECT TO authenticated
  USING (public.can_edit_content(auth.uid()));
CREATE POLICY "owners_write_wix_config" ON public.cms_wix_config FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'owner'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'owner'::public.app_role));

CREATE TRIGGER update_cms_wix_config_updated_at BEFORE UPDATE ON public.cms_wix_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.cms_wix_config (auto_push_enabled) SELECT true
  WHERE NOT EXISTS (SELECT 1 FROM public.cms_wix_config);
