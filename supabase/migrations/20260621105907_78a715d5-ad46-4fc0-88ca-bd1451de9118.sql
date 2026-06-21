-- =====================================================
-- PHASE 4 — ENQUIRIES CRM
-- =====================================================

ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
  ADD COLUMN IF NOT EXISTS due_at timestamptz,
  ADD COLUMN IF NOT EXISTS first_response_at timestamptz,
  ADD COLUMN IF NOT EXISTS replied_at timestamptz,
  ADD COLUMN IF NOT EXISTS closed_at timestamptz;

-- Recreate validate_enquiry_submission to allow 'closed'
CREATE OR REPLACE FUNCTION public.compute_enquiry_due_at(_subject text, _priority text)
RETURNS timestamptz LANGUAGE sql IMMUTABLE AS $$
  SELECT now() + (
    CASE
      WHEN _priority = 'urgent' THEN interval '4 hours'
      WHEN _priority = 'high' THEN interval '24 hours'
      WHEN _subject ILIKE '%Wedding%' THEN interval '24 hours'
      WHEN _subject ILIKE '%Corporate%' THEN interval '24 hours'
      WHEN _subject ILIKE '%Private%' THEN interval '48 hours'
      ELSE interval '72 hours'
    END
  );
$$;

CREATE OR REPLACE FUNCTION public.enquiry_set_due_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.due_at IS NULL THEN
    NEW.due_at := public.compute_enquiry_due_at(NEW.subject, COALESCE(NEW.priority,'normal'));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enquiry_set_due_at_trg ON public.enquiries;
CREATE TRIGGER enquiry_set_due_at_trg BEFORE INSERT ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.enquiry_set_due_at();

-- Lifecycle timestamps on UPDATE
CREATE OR REPLACE FUNCTION public.enquiry_lifecycle_stamps()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NEW.status <> 'new' AND OLD.status = 'new' AND NEW.first_response_at IS NULL THEN
      NEW.first_response_at := now();
    END IF;
    IF NEW.status = 'replied' AND NEW.replied_at IS NULL THEN
      NEW.replied_at := now();
    END IF;
    IF NEW.status IN ('archived','closed') AND NEW.closed_at IS NULL THEN
      NEW.closed_at := now();
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enquiry_lifecycle_stamps_trg ON public.enquiries;
CREATE TRIGGER enquiry_lifecycle_stamps_trg BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.enquiry_lifecycle_stamps();

-- Enquiry notes (threaded)
CREATE TABLE IF NOT EXISTS public.enquiry_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id uuid NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id),
  author_email text,
  kind text NOT NULL DEFAULT 'note' CHECK (kind IN ('note','status_change','assignment','system')),
  content text NOT NULL,
  pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_enquiry_notes_enquiry ON public.enquiry_notes(enquiry_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiry_notes TO authenticated;
GRANT ALL ON public.enquiry_notes TO service_role;

ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read enquiry notes" ON public.enquiry_notes
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins insert enquiry notes" ON public.enquiry_notes
  FOR INSERT TO authenticated WITH CHECK (public.is_admin() AND author_id = auth.uid());
CREATE POLICY "Admins update own enquiry notes" ON public.enquiry_notes
  FOR UPDATE TO authenticated USING (public.is_admin() AND author_id = auth.uid());
CREATE POLICY "Admins delete own enquiry notes" ON public.enquiry_notes
  FOR DELETE TO authenticated USING (public.is_admin() AND author_id = auth.uid());

-- Auto-log status & assignment changes as system notes
CREATE OR REPLACE FUNCTION public.enquiry_log_changes()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _actor_email text;
BEGIN
  SELECT email INTO _actor_email FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.enquiry_notes (enquiry_id, author_id, author_email, kind, content)
    VALUES (NEW.id, auth.uid(), _actor_email, 'status_change',
            format('Status: %s → %s', OLD.status, NEW.status));
  END IF;
  IF NEW.assigned_to IS DISTINCT FROM OLD.assigned_to THEN
    INSERT INTO public.enquiry_notes (enquiry_id, author_id, author_email, kind, content)
    VALUES (NEW.id, auth.uid(), _actor_email, 'assignment',
            format('Assignee: %s → %s', COALESCE(OLD.assigned_to::text,'unassigned'), COALESCE(NEW.assigned_to::text,'unassigned')));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enquiry_log_changes_trg ON public.enquiries;
CREATE TRIGGER enquiry_log_changes_trg AFTER UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.enquiry_log_changes();

-- =====================================================
-- PHASE 5 — TESTIMONIALS WORKFLOW
-- =====================================================

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS moderation_status text NOT NULL DEFAULT 'approved' CHECK (moderation_status IN ('pending','approved','rejected')),
  ADD COLUMN IF NOT EXISTS submitted_by_name text,
  ADD COLUMN IF NOT EXISTS submitted_by_email text,
  ADD COLUMN IF NOT EXISTS submitted_at timestamptz,
  ADD COLUMN IF NOT EXISTS moderation_note text,
  ADD COLUMN IF NOT EXISTS moderated_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS moderated_at timestamptz,
  ADD COLUMN IF NOT EXISTS verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS rotation_rank integer NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_testimonials_moderation ON public.testimonials(moderation_status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_rotation ON public.testimonials(rotation_rank DESC) WHERE is_published = true AND moderation_status = 'approved';

-- Tighten public SELECT: only published AND approved
DROP POLICY IF EXISTS "Published testimonials are public" ON public.testimonials;
CREATE POLICY "Published & approved testimonials are public"
  ON public.testimonials FOR SELECT
  USING (is_published = true AND moderation_status = 'approved');

-- Allow anonymous public submissions, but locked to pending + unpublished
CREATE POLICY "Anyone can submit pending testimonial"
  ON public.testimonials FOR INSERT
  WITH CHECK (
    moderation_status = 'pending'
    AND is_published = false
    AND is_featured = false
    AND length(quote) BETWEEN 20 AND 2000
    AND length(COALESCE(person_name,'')) BETWEEN 1 AND 200
    AND (submitted_by_email IS NULL OR length(submitted_by_email) <= 255)
    AND (submitted_by_name IS NULL OR length(submitted_by_name) <= 200)
    AND rating BETWEEN 1 AND 5
    AND moderated_by IS NULL
    AND moderated_at IS NULL
    AND verified_at IS NULL
  );

-- Block public from flipping moderation/publish; only editors can.
CREATE OR REPLACE FUNCTION public.testimonial_guard()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.submitted_at IS NULL AND NEW.moderation_status = 'pending' THEN
      NEW.submitted_at := now();
    END IF;
    RETURN NEW;
  END IF;
  -- UPDATE: if caller isn't an editor, freeze moderation/publish/featured/verified fields
  IF NOT public.can_edit_content() THEN
    NEW.moderation_status := OLD.moderation_status;
    NEW.is_published := OLD.is_published;
    NEW.is_featured := OLD.is_featured;
    NEW.verified_at := OLD.verified_at;
    NEW.moderated_by := OLD.moderated_by;
    NEW.moderated_at := OLD.moderated_at;
    NEW.rotation_rank := OLD.rotation_rank;
  ELSE
    IF NEW.moderation_status IS DISTINCT FROM OLD.moderation_status THEN
      NEW.moderated_by := auth.uid();
      NEW.moderated_at := now();
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS testimonial_guard_trg ON public.testimonials;
CREATE TRIGGER testimonial_guard_trg BEFORE INSERT OR UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.testimonial_guard();

-- =====================================================
-- PHASE 6 — SEO INTELLIGENCE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.seo_keyword_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  target_url text NOT NULL,
  database text NOT NULL DEFAULT 'uk',
  current_position numeric,
  baseline_position numeric,
  last_checked_at timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (keyword, target_url, database)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_keyword_tracking TO authenticated;
GRANT ALL ON public.seo_keyword_tracking TO service_role;
ALTER TABLE public.seo_keyword_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Editors read keywords" ON public.seo_keyword_tracking
  FOR SELECT TO authenticated USING (public.can_edit_content());
CREATE POLICY "Admins manage keywords" ON public.seo_keyword_tracking
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_keyword_tracking_updated_at BEFORE UPDATE ON public.seo_keyword_tracking
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.seo_broken_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  status_code integer,
  error_type text,
  found_on text,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_checked_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  UNIQUE (url, found_on)
);

CREATE INDEX IF NOT EXISTS idx_seo_broken_unresolved ON public.seo_broken_links(last_checked_at DESC) WHERE resolved_at IS NULL;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_broken_links TO authenticated;
GRANT ALL ON public.seo_broken_links TO service_role;
ALTER TABLE public.seo_broken_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Editors read broken links" ON public.seo_broken_links
  FOR SELECT TO authenticated USING (public.can_edit_content());
CREATE POLICY "Admins manage broken links" ON public.seo_broken_links
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE IF NOT EXISTS public.seo_schema_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  schema_hash text NOT NULL,
  schema_json jsonb,
  changed_from_previous boolean NOT NULL DEFAULT false,
  checked_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_seo_schema_url_time ON public.seo_schema_snapshots(url, checked_at DESC);

GRANT SELECT, INSERT ON public.seo_schema_snapshots TO authenticated;
GRANT ALL ON public.seo_schema_snapshots TO service_role;
ALTER TABLE public.seo_schema_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Editors read schema snapshots" ON public.seo_schema_snapshots
  FOR SELECT TO authenticated USING (public.can_edit_content());

CREATE TABLE IF NOT EXISTS public.seo_weekly_digests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start date NOT NULL UNIQUE,
  metrics jsonb NOT NULL DEFAULT '{}'::jsonb,
  alerts_count integer NOT NULL DEFAULT 0,
  broken_links_count integer NOT NULL DEFAULT 0,
  schema_drift_count integer NOT NULL DEFAULT 0,
  freshness_outdated_count integer NOT NULL DEFAULT 0,
  generated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.seo_weekly_digests TO authenticated;
GRANT ALL ON public.seo_weekly_digests TO service_role;
ALTER TABLE public.seo_weekly_digests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Editors read weekly digests" ON public.seo_weekly_digests
  FOR SELECT TO authenticated USING (public.can_edit_content());

-- Cron schedules
SELECT cron.schedule('seo-broken-link-crawl-nightly', '30 3 * * *', $$
  SELECT net.http_post(
    url := 'https://xysmiqehkvuifsubalyd.supabase.co/functions/v1/seo-broken-link-crawl',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  );
$$);

SELECT cron.schedule('seo-schema-drift-nightly', '45 3 * * *', $$
  SELECT net.http_post(
    url := 'https://xysmiqehkvuifsubalyd.supabase.co/functions/v1/seo-schema-drift',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  );
$$);

SELECT cron.schedule('seo-weekly-digest-monday', '0 7 * * 1', $$
  SELECT net.http_post(
    url := 'https://xysmiqehkvuifsubalyd.supabase.co/functions/v1/seo-weekly-digest',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  );
$$);