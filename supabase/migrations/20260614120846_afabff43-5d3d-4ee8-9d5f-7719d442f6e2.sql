
DROP POLICY IF EXISTS "Anyone can track page views" ON public.page_views;
CREATE POLICY "Anyone can track page views" ON public.page_views FOR INSERT
WITH CHECK (
  length(path) <= 500
  AND (page_title IS NULL OR length(page_title) <= 200)
  AND (referrer IS NULL OR length(referrer) <= 500)
  AND (device_type IS NULL OR length(device_type) <= 50)
  AND (session_id IS NULL OR length(session_id) <= 100)
);

DROP POLICY IF EXISTS "Anyone can track CTA clicks" ON public.cta_events;
CREATE POLICY "Anyone can track CTA clicks" ON public.cta_events FOR INSERT
WITH CHECK (
  length(cta_label) <= 200
  AND (cta_type IS NULL OR length(cta_type) <= 50)
  AND (destination IS NULL OR length(destination) <= 500)
  AND (path IS NULL OR length(path) <= 500)
  AND (session_id IS NULL OR length(session_id) <= 100)
);
