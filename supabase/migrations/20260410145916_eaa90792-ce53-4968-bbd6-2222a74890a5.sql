
-- Role enum
CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'editor', 'viewer');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role public.app_role NOT NULL DEFAULT 'viewer',
  provider TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Approved admin emails
CREATE TABLE public.approved_admin_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  default_role public.app_role NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.approved_admin_emails ENABLE ROW LEVEL SECURITY;

-- Seed approved emails
INSERT INTO public.approved_admin_emails (email, default_role) VALUES
  ('puranights@gmail.com', 'owner'),
  ('syedbiz96@gmail.com', 'owner');

-- has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Check if user has any admin-level role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = _user_id AND role IN ('owner', 'admin')
  )
$$;

-- Check if user has content editing rights
CREATE OR REPLACE FUNCTION public.can_edit_content(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = _user_id AND role IN ('owner', 'admin', 'editor')
  )
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _approved_role public.app_role;
  _email TEXT;
BEGIN
  _email := LOWER(NEW.email);
  
  SELECT default_role INTO _approved_role
  FROM public.approved_admin_emails
  WHERE LOWER(email) = _email AND is_active = true;

  INSERT INTO public.profiles (user_id, email, full_name, avatar_url, role, provider)
  VALUES (
    NEW.id,
    _email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(_approved_role, 'viewer'),
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profiles policies
CREATE POLICY "Users can read all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Approved admin emails policies
CREATE POLICY "Only admins can read approved emails" ON public.approved_admin_emails FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Only owners can manage approved emails" ON public.approved_admin_emails FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'owner'));

-- Gallery Albums
CREATE TABLE public.gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  cover_image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_gallery_albums_updated_at BEFORE UPDATE ON public.gallery_albums FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Published albums are public" ON public.gallery_albums FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can read all albums" ON public.gallery_albums FOR SELECT TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can manage albums" ON public.gallery_albums FOR INSERT TO authenticated WITH CHECK (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update albums" ON public.gallery_albums FOR UPDATE TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete albums" ON public.gallery_albums FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Gallery Assets
CREATE TABLE public.gallery_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  title TEXT,
  caption TEXT,
  alt_text TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_path TEXT,
  media_type TEXT NOT NULL DEFAULT 'image',
  orientation TEXT DEFAULT 'landscape',
  focal_point_x REAL DEFAULT 0.5,
  focal_point_y REAL DEFAULT 0.5,
  tags TEXT[] DEFAULT '{}',
  location_tag TEXT,
  service_tag TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_assets ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_gallery_assets_updated_at BEFORE UPDATE ON public.gallery_assets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Published assets are public" ON public.gallery_assets FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can read all assets" ON public.gallery_assets FOR SELECT TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can manage assets" ON public.gallery_assets FOR INSERT TO authenticated WITH CHECK (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update assets" ON public.gallery_assets FOR UPDATE TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete assets" ON public.gallery_assets FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Team Members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  role_title TEXT NOT NULL,
  specialties TEXT[] DEFAULT '{}',
  short_bio TEXT,
  full_bio TEXT,
  profile_image_url TEXT,
  instagram_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Published members are public" ON public.team_members FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can read all members" ON public.team_members FOR SELECT TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can manage members" ON public.team_members FOR INSERT TO authenticated WITH CHECK (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update members" ON public.team_members FOR UPDATE TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete members" ON public.team_members FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Events
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL DEFAULT 'latin-friday',
  venue_name TEXT,
  venue_address TEXT,
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ,
  summary TEXT,
  body TEXT,
  ticket_url TEXT,
  calendar_url TEXT,
  cover_image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Published events are public" ON public.events FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can read all events" ON public.events FOR SELECT TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can manage events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update events" ON public.events FOR UPDATE TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_name TEXT NOT NULL,
  context_label TEXT,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  image_url TEXT,
  source_type TEXT DEFAULT 'google',
  source_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Published testimonials are public" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can read all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can manage testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Enquiries (replaces/extends contact_submissions)
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Anyone can submit an enquiry
CREATE POLICY "Anyone can submit enquiry" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read enquiries" ON public.enquiries FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Page Views (analytics)
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  device_type TEXT,
  session_id TEXT,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track page views" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read page views" ON public.page_views FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

-- CTA Events (analytics)
CREATE TABLE public.cta_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  cta_label TEXT,
  cta_type TEXT,
  destination TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cta_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track CTA clicks" ON public.cta_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read CTA events" ON public.cta_events FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

-- Site Settings
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value_json JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Anyone can read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('team', 'team', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('events', 'events', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('hero-media', 'hero-media', true);

-- Storage policies for gallery bucket
CREATE POLICY "Gallery images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Editors can upload to gallery" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update gallery files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete gallery files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

-- Storage policies for team bucket
CREATE POLICY "Team images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'team');
CREATE POLICY "Editors can upload to team" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'team' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update team files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'team' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete team files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'team' AND public.is_admin(auth.uid()));

-- Storage policies for events bucket
CREATE POLICY "Event images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'events');
CREATE POLICY "Editors can upload to events" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'events' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update event files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'events' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete event files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'events' AND public.is_admin(auth.uid()));

-- Storage policies for hero-media bucket
CREATE POLICY "Hero media is publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'hero-media');
CREATE POLICY "Editors can upload hero media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hero-media' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update hero media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'hero-media' AND public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete hero media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'hero-media' AND public.is_admin(auth.uid()));

-- Indexes for performance
CREATE INDEX idx_gallery_assets_album ON public.gallery_assets(album_id);
CREATE INDEX idx_gallery_assets_featured ON public.gallery_assets(is_featured) WHERE is_featured = true;
CREATE INDEX idx_gallery_assets_published ON public.gallery_assets(is_published) WHERE is_published = true;
CREATE INDEX idx_events_start ON public.events(start_datetime);
CREATE INDEX idx_events_published ON public.events(is_published) WHERE is_published = true;
CREATE INDEX idx_testimonials_featured ON public.testimonials(is_featured) WHERE is_featured = true;
CREATE INDEX idx_enquiries_status ON public.enquiries(status);
CREATE INDEX idx_page_views_path ON public.page_views(path);
CREATE INDEX idx_page_views_viewed_at ON public.page_views(viewed_at);
CREATE INDEX idx_cta_events_path ON public.cta_events(path);

-- Seed team members
INSERT INTO public.team_members (name, slug, role_title, specialties, short_bio, instagram_url, sort_order, is_published) VALUES
  ('Melitta Siomos', 'melitta-siomos', 'Founder & Lead Instructor', ARRAY['Salsa On1', 'Bachata Sensual', 'Wedding Dance', 'Latin Styling'], 'Award-winning international dance instructor with 15+ years experience. Founder of Pura Nights, Pura Ladies, and Wedding Dance Made Easy.', 'https://www.instagram.com/melittasiomos/', 1, true),
  ('Roger Cracco', 'roger-cracco', 'Guest Teacher & Choreographer', ARRAY['Salsa', 'Bachata', 'Performance Choreography', 'Workshops'], 'International guest teacher and choreographer, regularly featured at Pura Nights events and Monthly Latin Fridays.', 'https://www.instagram.com/puranights.salsabachata/', 2, true),
  ('Tiffany', 'tiffany', 'Assistant Instructor', ARRAY['Beginner Classes', 'Ladies Styling', 'Group Teaching'], 'Part of the Pura Nights family for several years, delivering the beginners and ladies styling programme.', 'https://www.instagram.com/puranights.salsabachata/', 3, true),
  ('Eva', 'eva', 'Instructor', ARRAY['Bachata Sensual', 'Latin Styling', 'Intermediate Teaching'], 'Skilled social dancer and instructor bringing technical depth and warmth to the Pura Nights team.', 'https://www.instagram.com/puranights.salsabachata/', 4, true),
  ('Edi', 'edi', 'Instructor', ARRAY['Salsa On1', 'Intermediate & Advanced Footwork'], 'Dedicated Salsa technician known for precise footwork and breaking down advanced combinations.', 'https://www.instagram.com/puranights.salsabachata/', 5, true),
  ('Ezgi', 'ezgi', 'Instructor', ARRAY['Bachata Sensual', 'Ladies Styling', 'Body Movement'], 'Brings elegance and expressiveness to every session with speciality in body movement.', 'https://www.instagram.com/puranights.salsabachata/', 6, true),
  ('Luis', 'luis', 'Instructor', ARRAY['Salsa On1', 'Social Dancing', 'Advanced Combinations'], 'Natural social dancer bringing joy and depth of Salsa knowledge to all levels.', 'https://www.instagram.com/puranights.salsabachata/', 7, true),
  ('Kevin', 'kevin', 'Instructor', ARRAY['Salsa', 'Footwork', 'Social Floor Confidence'], 'Teaching philosophy centres on social dance confidence with a relaxed, encouraging style.', 'https://www.instagram.com/puranights.salsabachata/', 8, true);
