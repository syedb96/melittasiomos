
-- 1. Audit log table
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_email TEXT,
  action TEXT NOT NULL,          -- e.g. 'sign_in', 'sign_out', 'page_published'
  entity_type TEXT,              -- e.g. 'auth', 'cms_page'
  entity_id TEXT,                -- free-form id (uuid or slug)
  entity_label TEXT,             -- human label (page title, etc.)
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created_at ON public.admin_audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_action ON public.admin_audit_log (action);

GRANT SELECT, INSERT ON public.admin_audit_log TO authenticated;
GRANT ALL ON public.admin_audit_log TO service_role;

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Admins/owners can read everything; service role bypasses RLS
CREATE POLICY "Admins can read audit log"
  ON public.admin_audit_log FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Any signed-in user can insert a row about themselves; actor_id is forced server-side via trigger
CREATE POLICY "Users can insert their own audit row"
  ON public.admin_audit_log FOR INSERT
  TO authenticated
  WITH CHECK (actor_id = auth.uid() OR actor_id IS NULL);

-- 2. Trigger to stamp actor_id/email if missing
CREATE OR REPLACE FUNCTION public.stamp_audit_actor()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.actor_id IS NULL THEN
    NEW.actor_id := auth.uid();
  END IF;
  IF NEW.actor_email IS NULL AND NEW.actor_id IS NOT NULL THEN
    SELECT email INTO NEW.actor_email FROM public.profiles WHERE user_id = NEW.actor_id LIMIT 1;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_stamp_audit_actor ON public.admin_audit_log;
CREATE TRIGGER trg_stamp_audit_actor
  BEFORE INSERT ON public.admin_audit_log
  FOR EACH ROW EXECUTE FUNCTION public.stamp_audit_actor();

-- 3. Enable realtime for dashboard live updates
ALTER TABLE public.enquiries REPLICA IDENTITY FULL;
ALTER TABLE public.cms_pages REPLICA IDENTITY FULL;
ALTER TABLE public.admin_audit_log REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'enquiries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.enquiries;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'cms_pages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_pages;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'admin_audit_log'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_audit_log;
  END IF;
END $$;
