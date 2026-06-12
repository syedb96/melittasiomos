-- CMS Phase 1: Pages, Versions, Redirects, Navigation, Site Settings, Media metadata

-- Status enum for pages
CREATE TYPE public.cms_page_status AS ENUM ('draft', 'scheduled', 'published', 'archived');

-- =====================================================
-- cms_pages
-- =====================================================
CREATE TABLE public.cms_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_html TEXT NOT NULL DEFAULT '',
  status public.cms_page_status NOT NULL DEFAULT 'draft',
  publish_at TIMESTAMPTZ,
  page_type TEXT NOT NULL DEFAULT 'page',
  hero_image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  noindex BOOLEAN NOT NULL DEFAULT false,
  schema_jsonld JSONB,
  category TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ
);
CREATE INDEX cms_pages_status_idx ON public.cms_pages (status);
CREATE INDEX cms_pages_slug_idx ON public.cms_pages (slug);
CREATE INDEX cms_pages_type_idx ON public.cms_pages (page_type);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_pages TO authenticated;
GRANT SELECT ON public.cms_pages TO anon;
GRANT ALL ON public.cms_pages TO service_role;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published pages" ON public.cms_pages
  FOR SELECT TO anon, authenticated
  USING (status = 'published');
CREATE POLICY "Editors can read all pages" ON public.cms_pages
  FOR SELECT TO authenticated
  USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can insert pages" ON public.cms_pages
  FOR INSERT TO authenticated
  WITH CHECK (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can update pages" ON public.cms_pages
  FOR UPDATE TO authenticated
  USING (public.can_edit_content(auth.uid()))
  WITH CHECK (public.can_edit_content(auth.uid()));
CREATE POLICY "Admins can delete pages" ON public.cms_pages
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE TRIGGER cms_pages_updated_at BEFORE UPDATE ON public.cms_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- cms_page_versions
-- =====================================================
CREATE TABLE public.cms_page_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  snapshot JSONB NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_id, version_number)
);
CREATE INDEX cms_page_versions_page_idx ON public.cms_page_versions (page_id, version_number DESC);

GRANT SELECT, INSERT ON public.cms_page_versions TO authenticated;
GRANT ALL ON public.cms_page_versions TO service_role;
ALTER TABLE public.cms_page_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Editors can read versions" ON public.cms_page_versions
  FOR SELECT TO authenticated USING (public.can_edit_content(auth.uid()));
CREATE POLICY "Editors can insert versions" ON public.cms_page_versions
  FOR INSERT TO authenticated WITH CHECK (public.can_edit_content(auth.uid()));

-- =====================================================
-- cms_redirects
-- =====================================================
CREATE TABLE public.cms_redirects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_path TEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  status_code INTEGER NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_redirects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_redirects TO authenticated;
GRANT ALL ON public.cms_redirects TO service_role;
ALTER TABLE public.cms_redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active redirects" ON public.cms_redirects
  FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Editors manage redirects" ON public.cms_redirects
  FOR ALL TO authenticated
  USING (public.can_edit_content(auth.uid()))
  WITH CHECK (public.can_edit_content(auth.uid()));

CREATE TRIGGER cms_redirects_updated_at BEFORE UPDATE ON public.cms_redirects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- cms_navigation (header/footer menus)
-- =====================================================
CREATE TABLE public.cms_navigation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_key TEXT NOT NULL,
  parent_id UUID REFERENCES public.cms_navigation(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  open_in_new_tab BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX cms_navigation_menu_idx ON public.cms_navigation (menu_key, sort_order);
GRANT SELECT ON public.cms_navigation TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_navigation TO authenticated;
GRANT ALL ON public.cms_navigation TO service_role;
ALTER TABLE public.cms_navigation ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active nav" ON public.cms_navigation
  FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Editors manage nav" ON public.cms_navigation
  FOR ALL TO authenticated
  USING (public.can_edit_content(auth.uid()))
  WITH CHECK (public.can_edit_content(auth.uid()));

CREATE TRIGGER cms_navigation_updated_at BEFORE UPDATE ON public.cms_navigation
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- cms_settings (global key/value store)
-- =====================================================
CREATE TABLE public.cms_settings (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);
GRANT SELECT ON public.cms_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_settings TO authenticated;
GRANT ALL ON public.cms_settings TO service_role;
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings" ON public.cms_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage settings" ON public.cms_settings
  FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE TRIGGER cms_settings_updated_at BEFORE UPDATE ON public.cms_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- cms_media (metadata layer for media library — actual files in storage buckets)
-- =====================================================
CREATE TABLE public.cms_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kind TEXT NOT NULL DEFAULT 'image' CHECK (kind IN ('image','video','youtube','file')),
  url TEXT NOT NULL,
  storage_path TEXT,
  bucket TEXT,
  thumbnail_url TEXT,
  title TEXT,
  alt_text TEXT,
  caption TEXT,
  folder TEXT NOT NULL DEFAULT 'uncategorized',
  tags TEXT[] NOT NULL DEFAULT '{}',
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  mime_type TEXT,
  youtube_id TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX cms_media_folder_idx ON public.cms_media (folder);
CREATE INDEX cms_media_kind_idx ON public.cms_media (kind);
GRANT SELECT ON public.cms_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_media TO authenticated;
GRANT ALL ON public.cms_media TO service_role;
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read media" ON public.cms_media
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Editors manage media" ON public.cms_media
  FOR ALL TO authenticated
  USING (public.can_edit_content(auth.uid()))
  WITH CHECK (public.can_edit_content(auth.uid()));

CREATE TRIGGER cms_media_updated_at BEFORE UPDATE ON public.cms_media
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default site settings
INSERT INTO public.cms_settings (key, value, description) VALUES
  ('site', '{"title":"Pura Nights","tagline":"Premium Latin Dance in West London","base_url":"https://puranights.com"}'::jsonb, 'Global site identity'),
  ('seo_defaults', '{"meta_title":"Pura Nights — Salsa & Bachata Classes London","meta_description":"Premium Salsa and Bachata classes, socials and Latin Fridays in Chiswick and Ealing.","og_image":""}'::jsonb, 'Fallback SEO when a page omits its own'),
  ('analytics', '{"ga4_id":"","gtm_id":""}'::jsonb, 'Analytics IDs');
