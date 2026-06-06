CREATE TABLE public.free_taster_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  email text NOT NULL,
  venue_preference text,
  message text,
  source_page text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.free_taster_leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.free_taster_leads TO authenticated;
GRANT ALL ON public.free_taster_leads TO service_role;

ALTER TABLE public.free_taster_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit free taster lead"
  ON public.free_taster_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(first_name) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (message IS NULL OR char_length(message) <= 1000)
    AND (venue_preference IS NULL OR char_length(venue_preference) <= 100)
    AND (source_page IS NULL OR char_length(source_page) <= 500)
  );

CREATE POLICY "Admins can read free taster leads"
  ON public.free_taster_leads FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update free taster leads"
  ON public.free_taster_leads FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete free taster leads"
  ON public.free_taster_leads FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE INDEX idx_free_taster_leads_created_at ON public.free_taster_leads (created_at DESC);