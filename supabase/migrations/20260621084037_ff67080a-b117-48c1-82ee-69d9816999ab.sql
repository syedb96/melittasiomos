
ALTER TABLE public.cms_pages 
  ADD COLUMN IF NOT EXISTS workflow_status TEXT NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS review_date DATE,
  ADD COLUMN IF NOT EXISTS author_name TEXT,
  ADD COLUMN IF NOT EXISTS sources JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS publish_gate JSONB;

ALTER TABLE public.cms_pages DROP CONSTRAINT IF EXISTS cms_pages_workflow_status_chk;
ALTER TABLE public.cms_pages ADD CONSTRAINT cms_pages_workflow_status_chk
  CHECK (workflow_status IN ('idea','brief','draft','editing','review','scheduled','published','update_required','archived'));

CREATE OR REPLACE FUNCTION public.cms_page_freshness(_published_at TIMESTAMPTZ, _review_date DATE)
RETURNS TEXT LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT CASE
    WHEN _review_date IS NOT NULL AND _review_date < CURRENT_DATE THEN 'outdated'
    WHEN _review_date IS NOT NULL AND _review_date < (CURRENT_DATE + INTERVAL '30 days')::date THEN 'review_soon'
    WHEN _published_at IS NOT NULL AND _published_at < (now() - INTERVAL '365 days') THEN 'outdated'
    WHEN _published_at IS NOT NULL AND _published_at < (now() - INTERVAL '180 days') THEN 'review_soon'
    ELSE 'fresh'
  END;
$$;
