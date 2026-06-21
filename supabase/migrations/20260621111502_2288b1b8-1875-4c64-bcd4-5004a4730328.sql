
CREATE TABLE public.commerce_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'class',
  summary text,
  availability text NOT NULL DEFAULT 'available'
    CHECK (availability IN ('available','enquiry_only','waitlist','paused')),
  pause_reason text,
  public_notice text,
  cta_label text,
  default_booking_link_id uuid REFERENCES public.commerce_booking_links(id) ON DELETE SET NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_listed boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.commerce_services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.commerce_services TO authenticated;
GRANT ALL ON public.commerce_services TO service_role;

ALTER TABLE public.commerce_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read services"
  ON public.commerce_services FOR SELECT
  USING (true);

CREATE POLICY "Admins manage services"
  ON public.commerce_services FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER trg_commerce_services_updated
  BEFORE UPDATE ON public.commerce_services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed canonical Pura Nights services
INSERT INTO public.commerce_services (slug, name, category, summary, availability, cta_label, sort_order) VALUES
  ('group-classes',     'Group Classes',         'class',   'Weekly salsa & bachata classes in Chiswick and Ealing.', 'available',    'Book a class',          10),
  ('latin-friday',      'Monthly Latin Friday',  'event',   'Once-a-month Latin party with class + social dancing.',  'available',    'Get tickets',           20),
  ('wedding-dance',     'Wedding Dance',         'service', 'Bespoke first-dance choreography for couples.',          'enquiry_only', 'Enquire on WhatsApp',   30),
  ('private-lessons',   'Private Lessons',       'service', '1-to-1 coaching with senior instructors.',               'enquiry_only', 'Enquire on WhatsApp',   40),
  ('pura-ladies',       'Pura Ladies',           'team',    'Ladies performance team — auditions seasonally.',        'enquiry_only', 'Apply to audition',     50),
  ('corporate',         'Corporate / Hen Party', 'service', 'Team-building, hen parties and corporate events.',       'enquiry_only', 'Request a quote',       60),
  ('gift-vouchers',     'Gift Vouchers',         'product', 'Digital vouchers for classes and events.',               'available',    'Buy a voucher',         70),
  ('online-classes',    'Online Classes',        'class',   'Live and on-demand online learning.',                    'paused',       'Notify me',             80)
ON CONFLICT (slug) DO NOTHING;
