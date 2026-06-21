
-- Phase 2 Commercial Controls: 5 tables, RLS, GRANTs, updated_at triggers.

-- Reuse existing update_updated_at_column() function.

-- ============ 1. BOOKING LINKS ============
CREATE TABLE public.commerce_booking_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('ticket_tailor','whatsapp','email','enquiry_form','external')),
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  url text NOT NULL,
  prefilled_message text,
  owner_email text,
  usage_notes text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.commerce_booking_links TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_booking_links TO authenticated;
GRANT ALL ON public.commerce_booking_links TO service_role;
ALTER TABLE public.commerce_booking_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active booking links" ON public.commerce_booking_links
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage booking links" ON public.commerce_booking_links
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_commerce_booking_links_updated
  BEFORE UPDATE ON public.commerce_booking_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ 2. VENUES ============
CREATE TABLE public.commerce_venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_name text,
  address_line_1 text,
  address_line_2 text,
  postcode text,
  map_url text,
  directions_html text,
  transport_html text,
  parking_html text,
  accessibility_html text,
  hero_image_url text,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  seo_title text,
  seo_description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.commerce_venues TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_venues TO authenticated;
GRANT ALL ON public.commerce_venues TO service_role;
ALTER TABLE public.commerce_venues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active venues" ON public.commerce_venues
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage venues" ON public.commerce_venues
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_commerce_venues_updated
  BEFORE UPDATE ON public.commerce_venues
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ 3. PRICES ============
CREATE TABLE public.commerce_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  kind text NOT NULL CHECK (kind IN (
    'drop-in','class-only','social-only','combined','student',
    'bundle-5','bundle-10','event-ticket','voucher','online-coaching',
    'merch','enquiry-only'
  )),
  amount_pence integer,
  currency text NOT NULL DEFAULT 'GBP',
  previous_amount_pence integer,
  venue_id uuid REFERENCES public.commerce_venues(id) ON DELETE SET NULL,
  service_slug text,
  is_active boolean NOT NULL DEFAULT true,
  starts_at timestamptz,
  ends_at timestamptz,
  cta_label text,
  booking_link_id uuid REFERENCES public.commerce_booking_links(id) ON DELETE SET NULL,
  terms text,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.commerce_prices TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_prices TO authenticated;
GRANT ALL ON public.commerce_prices TO service_role;
ALTER TABLE public.commerce_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active prices" ON public.commerce_prices
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage prices" ON public.commerce_prices
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_commerce_prices_updated
  BEFORE UPDATE ON public.commerce_prices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Validate previous_amount_pence only set when it exceeds amount_pence (genuine markdown).
CREATE OR REPLACE FUNCTION public.validate_commerce_price()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.previous_amount_pence IS NOT NULL AND NEW.amount_pence IS NOT NULL
     AND NEW.previous_amount_pence <= NEW.amount_pence THEN
    RAISE EXCEPTION 'previous_amount_pence must be greater than amount_pence (genuine markdowns only)';
  END IF;
  IF NEW.starts_at IS NOT NULL AND NEW.ends_at IS NOT NULL AND NEW.ends_at <= NEW.starts_at THEN
    RAISE EXCEPTION 'ends_at must be after starts_at';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_commerce_price
  BEFORE INSERT OR UPDATE ON public.commerce_prices
  FOR EACH ROW EXECUTE FUNCTION public.validate_commerce_price();

-- ============ 4. SCHEDULE SLOTS ============
CREATE TABLE public.commerce_schedule_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid REFERENCES public.commerce_venues(id) ON DELETE CASCADE,
  weekday smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  class_style text NOT NULL,
  level text,
  instructor_id uuid,
  booking_link_id uuid REFERENCES public.commerce_booking_links(id) ON DELETE SET NULL,
  social_start_time time,
  social_end_time time,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.commerce_schedule_slots TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_schedule_slots TO authenticated;
GRANT ALL ON public.commerce_schedule_slots TO service_role;
ALTER TABLE public.commerce_schedule_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active slots" ON public.commerce_schedule_slots
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage slots" ON public.commerce_schedule_slots
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_commerce_slots_updated
  BEFORE UPDATE ON public.commerce_schedule_slots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.commerce_schedule_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id uuid REFERENCES public.commerce_schedule_slots(id) ON DELETE CASCADE,
  exception_date date NOT NULL,
  exception_type text NOT NULL CHECK (exception_type IN (
    'cancelled','replacement_venue','time_change','instructor_sub','holiday','notice'
  )),
  replacement_venue_id uuid REFERENCES public.commerce_venues(id) ON DELETE SET NULL,
  new_start_time time,
  new_end_time time,
  public_notice text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.commerce_schedule_exceptions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_schedule_exceptions TO authenticated;
GRANT ALL ON public.commerce_schedule_exceptions TO service_role;
ALTER TABLE public.commerce_schedule_exceptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read schedule exceptions" ON public.commerce_schedule_exceptions
  FOR SELECT USING (true);
CREATE POLICY "Admins manage exceptions" ON public.commerce_schedule_exceptions
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_commerce_exceptions_updated
  BEFORE UPDATE ON public.commerce_schedule_exceptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ 5. OFFERS ============
CREATE TABLE public.commerce_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  applicable_services text[] NOT NULL DEFAULT '{}'::text[],
  code text,
  eligibility text,
  cta_label text,
  cta_link_id uuid REFERENCES public.commerce_booking_links(id) ON DELETE SET NULL,
  terms text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.commerce_offers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.commerce_offers TO authenticated;
GRANT ALL ON public.commerce_offers TO service_role;
ALTER TABLE public.commerce_offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read live offers" ON public.commerce_offers
  FOR SELECT USING (
    is_active = true
    AND (starts_at IS NULL OR starts_at <= now())
    AND (ends_at IS NULL OR ends_at > now())
  );
CREATE POLICY "Admins manage offers" ON public.commerce_offers
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER trg_commerce_offers_updated
  BEFORE UPDATE ON public.commerce_offers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.validate_commerce_offer()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.starts_at IS NOT NULL AND NEW.ends_at IS NOT NULL AND NEW.ends_at <= NEW.starts_at THEN
    RAISE EXCEPTION 'ends_at must be after starts_at';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_commerce_offer
  BEFORE INSERT OR UPDATE ON public.commerce_offers
  FOR EACH ROW EXECUTE FUNCTION public.validate_commerce_offer();
