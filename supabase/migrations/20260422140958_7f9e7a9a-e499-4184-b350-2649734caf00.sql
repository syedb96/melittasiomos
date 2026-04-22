-- Create ambassadors table
CREATE TABLE public.ambassadors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  referral_count INTEGER NOT NULL DEFAULT 0,
  photo_url TEXT,
  instagram_url TEXT,
  accent_from TEXT DEFAULT 'from-primary',
  accent_to TEXT DEFAULT 'to-secondary',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ambassadors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published ambassadors are public"
  ON public.ambassadors FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Editors can read all ambassadors"
  ON public.ambassadors FOR SELECT
  TO authenticated
  USING (can_edit_content(auth.uid()));

CREATE POLICY "Editors can insert ambassadors"
  ON public.ambassadors FOR INSERT
  TO authenticated
  WITH CHECK (can_edit_content(auth.uid()));

CREATE POLICY "Editors can update ambassadors"
  ON public.ambassadors FOR UPDATE
  TO authenticated
  USING (can_edit_content(auth.uid()));

CREATE POLICY "Admins can delete ambassadors"
  ON public.ambassadors FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE TRIGGER update_ambassadors_updated_at
  BEFORE UPDATE ON public.ambassadors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with the existing hardcoded ambassadors
INSERT INTO public.ambassadors (name, tagline, referral_count, sort_order, accent_from, accent_to) VALUES
  ('Sofia M.', 'Brought 12 friends to her first Latin Friday', 12, 1, 'from-primary', 'to-secondary'),
  ('James T.', 'Wedding couple turned regulars', 9, 2, 'from-secondary', 'to-primary'),
  ('Priya K.', 'Pura Ladies champion since 2023', 8, 3, 'from-primary', 'to-secondary'),
  ('Marco D.', 'Office takeover hero — 7 colleagues', 7, 4, 'from-secondary', 'to-primary'),
  ('Aisha R.', 'Bachata buddy network builder', 6, 5, 'from-primary', 'to-secondary'),
  ('Tom & Lily', 'Couple who couples-dance everywhere', 6, 6, 'from-secondary', 'to-primary');