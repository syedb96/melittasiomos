CREATE TABLE public.security_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  source TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info',
  page_path TEXT,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  user_agent TEXT,
  ip_hint TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.security_events TO anon, authenticated;
GRANT SELECT ON public.security_events TO authenticated;
GRANT ALL ON public.security_events TO service_role;

ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert security events"
  ON public.security_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(event_type) <= 80
    AND length(source) <= 120
    AND severity IN ('info','warn','error')
    AND (page_path IS NULL OR length(page_path) <= 300)
    AND (user_agent IS NULL OR length(user_agent) <= 500)
  );

CREATE POLICY "Admins read security events"
  ON public.security_events FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE INDEX security_events_created_at_idx ON public.security_events (created_at DESC);
CREATE INDEX security_events_event_type_idx ON public.security_events (event_type);