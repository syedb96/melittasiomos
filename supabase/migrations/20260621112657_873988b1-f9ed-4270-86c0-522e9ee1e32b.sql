
-- ============================================================
-- Sprint 2: Forms manager + notification routing + test harness
-- ============================================================

-- 1) forms_config: editable schema for public-facing forms
CREATE TABLE IF NOT EXISTS public.forms_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  -- jsonb array of {name,label,type,required,maxLength,placeholder,helpText,options}
  fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  submit_label text NOT NULL DEFAULT 'Send enquiry',
  success_message text NOT NULL DEFAULT 'Thanks — we''ll be in touch shortly.',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.forms_config TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.forms_config TO authenticated;
GRANT ALL ON public.forms_config TO service_role;
ALTER TABLE public.forms_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "forms_config public read active" ON public.forms_config FOR SELECT USING (is_active = true);
CREATE POLICY "forms_config editors manage" ON public.forms_config FOR ALL TO authenticated USING (public.can_edit_content()) WITH CHECK (public.can_edit_content());
CREATE TRIGGER trg_forms_config_updated BEFORE UPDATE ON public.forms_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2) notification_routes: per-form / per-enquiry-type routing
CREATE TABLE IF NOT EXISTS public.notification_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_slug text NOT NULL,
  enquiry_type text, -- nullable = default for the form
  template_name text NOT NULL DEFAULT 'enquiry-confirmation',
  recipient_email text NOT NULL,  -- internal recipient
  cc_emails text[] NOT NULL DEFAULT '{}',
  send_user_confirmation boolean NOT NULL DEFAULT true,
  user_confirmation_template text NOT NULL DEFAULT 'user-confirmation',
  escalation_minutes integer NOT NULL DEFAULT 1440,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notification_routes TO authenticated;
GRANT ALL ON public.notification_routes TO service_role;
ALTER TABLE public.notification_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notification_routes admins manage" ON public.notification_routes FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_notification_routes_updated BEFORE UPDATE ON public.notification_routes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_notification_routes_form_type ON public.notification_routes (form_slug, enquiry_type) WHERE is_active;

-- 3) notification_log: outcome of every notification attempt
CREATE TABLE IF NOT EXISTS public.notification_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_slug text NOT NULL,
  enquiry_type text,
  submission_id uuid,
  route_id uuid REFERENCES public.notification_routes(id) ON DELETE SET NULL,
  recipient_email text NOT NULL,
  template_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending | sent | failed | skipped_no_email_infra | test
  error_message text,
  is_test boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.notification_log TO authenticated;
GRANT ALL ON public.notification_log TO service_role;
ALTER TABLE public.notification_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notification_log admins read" ON public.notification_log FOR SELECT TO authenticated USING (public.is_admin());
CREATE INDEX idx_notification_log_form_created ON public.notification_log (form_slug, created_at DESC);

-- 4) Seed default form configs (mirror existing public forms)
INSERT INTO public.forms_config (slug, name, description, fields, submit_label, success_message) VALUES
  ('contact', 'Contact Form',
   'Site-wide /contact form — general enquiries.',
   '[
     {"name":"name","label":"Your name","type":"text","required":true,"maxLength":200,"placeholder":"Jane Doe"},
     {"name":"email","label":"Email","type":"email","required":true,"maxLength":255,"placeholder":"jane@example.com"},
     {"name":"phone","label":"Phone (optional)","type":"tel","required":false,"maxLength":30,"placeholder":"+44 7..."},
     {"name":"message","label":"Message","type":"textarea","required":true,"maxLength":5000,"placeholder":"How can we help?"}
   ]'::jsonb,
   'Send message', 'Thanks — Melitta replies within 24 hours.'),
  ('enquiry', 'Enquiry Form',
   'Used by Wedding / Private / Corporate / Pura Ladies pages.',
   '[
     {"name":"name","label":"Your name","type":"text","required":true,"maxLength":200},
     {"name":"email","label":"Email","type":"email","required":true,"maxLength":255},
     {"name":"phone","label":"Phone","type":"tel","required":false,"maxLength":30},
     {"name":"subject","label":"Subject","type":"text","required":true,"maxLength":300},
     {"name":"message","label":"Your enquiry","type":"textarea","required":true,"maxLength":5000}
   ]'::jsonb,
   'Send enquiry', 'Thanks — we''ll reply within 24 hours.'),
  ('taster', 'Free Taster Lead Capture',
   'Lead magnet form on landing pages.',
   '[
     {"name":"name","label":"First name","type":"text","required":true,"maxLength":200},
     {"name":"email","label":"Email","type":"email","required":true,"maxLength":255},
     {"name":"venue","label":"Preferred venue","type":"select","required":false,"options":["Chiswick","Ealing","Either"]}
   ]'::jsonb,
   'Claim my free taster', 'Check your inbox for next steps.')
ON CONFLICT (slug) DO NOTHING;

-- 5) Seed default routes — single internal recipient until admin edits
INSERT INTO public.notification_routes (form_slug, enquiry_type, template_name, recipient_email, cc_emails, escalation_minutes) VALUES
  ('contact',  NULL, 'internal-contact',     'siomosmelitta@gmail.com', '{}', 1440),
  ('enquiry',  NULL, 'internal-enquiry',     'siomosmelitta@gmail.com', '{}', 1440),
  ('enquiry',  'Wedding Dance — Consultation',          'internal-enquiry', 'siomosmelitta@gmail.com', '{}', 1440),
  ('enquiry',  'Corporate Booking — Team Building',     'internal-enquiry', 'siomosmelitta@gmail.com', '{}', 1440),
  ('enquiry',  'Private Lessons — Enquiry',             'internal-enquiry', 'siomosmelitta@gmail.com', '{}', 2880),
  ('taster',   NULL, 'internal-taster',      'siomosmelitta@gmail.com', '{}', 4320)
ON CONFLICT DO NOTHING;
