
-- 1) email_templates: editable per-template subject/body + merge fields
CREATE TABLE IF NOT EXISTS public.email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  subject text NOT NULL,
  body_html text NOT NULL,
  body_text text,
  -- jsonb array of merge fields available to this template
  -- e.g. [{"key":"name","label":"Visitor name","example":"Jane"}]
  merge_fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_templates TO authenticated;
GRANT ALL ON public.email_templates TO service_role;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "email_templates admins manage" ON public.email_templates
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_email_templates_updated BEFORE UPDATE ON public.email_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2) Link notification_routes to editable templates (nullable until admin assigns)
ALTER TABLE public.notification_routes
  ADD COLUMN IF NOT EXISTS internal_template_id uuid REFERENCES public.email_templates(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS user_template_id uuid REFERENCES public.email_templates(id) ON DELETE SET NULL;

-- 3) Rate limiting (sliding window, per ip+email+form)
CREATE TABLE IF NOT EXISTS public.form_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_slug text NOT NULL,
  bucket_key text NOT NULL, -- 'ip:1.2.3.4' or 'email:foo@bar'
  window_started_at timestamptz NOT NULL DEFAULT now(),
  count integer NOT NULL DEFAULT 1,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (form_slug, bucket_key)
);
GRANT SELECT ON public.form_rate_limits TO authenticated;
GRANT ALL ON public.form_rate_limits TO service_role;
ALTER TABLE public.form_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "form_rate_limits admins read" ON public.form_rate_limits
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE INDEX IF NOT EXISTS idx_form_rate_limits_form_bucket
  ON public.form_rate_limits (form_slug, bucket_key);

-- 4) Duplicate detection (hashed payload, 24h ttl)
CREATE TABLE IF NOT EXISTS public.form_submission_hashes (
  hash text PRIMARY KEY,
  form_slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.form_submission_hashes TO authenticated;
GRANT ALL ON public.form_submission_hashes TO service_role;
ALTER TABLE public.form_submission_hashes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "form_submission_hashes admins read" ON public.form_submission_hashes
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE INDEX IF NOT EXISTS idx_form_submission_hashes_created
  ON public.form_submission_hashes (created_at);

-- 5) Seed default email templates (internal + user confirmations)
INSERT INTO public.email_templates (slug, name, description, subject, body_html, body_text, merge_fields)
VALUES
  ('internal-contact', 'Internal: Contact form',
   'Sent to Melitta when contact form is submitted.',
   'New contact form: {{name}}',
   '<h2>New contact enquiry</h2><p><b>Name:</b> {{name}}</p><p><b>Email:</b> {{email}}</p><p><b>Phone:</b> {{phone}}</p><p><b>Message:</b></p><p>{{message}}</p>',
   'New contact enquiry\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\n\n{{message}}',
   '[{"key":"name"},{"key":"email"},{"key":"phone"},{"key":"message"}]'::jsonb),
  ('internal-enquiry', 'Internal: Enquiry form',
   'Sent to Melitta for Wedding / Private / Corporate / Pura enquiries.',
   'New enquiry [{{enquiry_type}}]: {{name}}',
   '<h2>New enquiry</h2><p><b>Type:</b> {{enquiry_type}}</p><p><b>Name:</b> {{name}}</p><p><b>Email:</b> {{email}}</p><p><b>Phone:</b> {{phone}}</p><p><b>Subject:</b> {{subject}}</p><p>{{message}}</p>',
   null,
   '[{"key":"enquiry_type"},{"key":"name"},{"key":"email"},{"key":"phone"},{"key":"subject"},{"key":"message"}]'::jsonb),
  ('internal-taster', 'Internal: Free taster lead',
   'Sent when a free-taster lead form is submitted.',
   'New taster lead: {{name}} ({{venue}})',
   '<h2>New free-taster lead</h2><p><b>Name:</b> {{name}}</p><p><b>Email:</b> {{email}}</p><p><b>Venue:</b> {{venue}}</p>',
   null,
   '[{"key":"name"},{"key":"email"},{"key":"venue"}]'::jsonb),
  ('user-confirmation', 'User: Generic confirmation',
   'Default thank-you reply to the visitor.',
   'Thanks for contacting Pura Nights',
   '<p>Hi {{name}},</p><p>Thanks for getting in touch with Pura Nights — Melitta will reply personally within 24 hours.</p><p>— Pura Nights</p>',
   'Hi {{name}}, thanks for getting in touch with Pura Nights. We will reply within 24 hours.',
   '[{"key":"name"}]'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- 6) Backfill: link existing routes to seeded templates by template_name match
UPDATE public.notification_routes r
SET internal_template_id = t.id
FROM public.email_templates t
WHERE r.internal_template_id IS NULL AND r.template_name = t.slug;

UPDATE public.notification_routes r
SET user_template_id = t.id
FROM public.email_templates t
WHERE r.user_template_id IS NULL AND r.user_confirmation_template = t.slug;
