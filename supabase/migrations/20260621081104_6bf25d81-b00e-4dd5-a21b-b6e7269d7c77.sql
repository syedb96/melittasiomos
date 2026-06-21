
-- 1. Booking links: hide owner_email from public via a view
DROP POLICY IF EXISTS "Public can read active booking links" ON public.commerce_booking_links;
REVOKE SELECT ON public.commerce_booking_links FROM anon;

CREATE OR REPLACE VIEW public.commerce_booking_links_public AS
SELECT id, kind, slug, label, url, prefilled_message, usage_notes, is_active, created_at, updated_at
FROM public.commerce_booking_links
WHERE is_active = true;

GRANT SELECT ON public.commerce_booking_links_public TO anon, authenticated;

-- Allow authenticated non-admins to still read active rows via the table (used by admin UI for admins, harmless for others — owner_email column-grant restricted below)
CREATE POLICY "Authenticated can read active booking links"
  ON public.commerce_booking_links
  FOR SELECT TO authenticated
  USING (is_active = true OR public.is_admin(auth.uid()));

-- Belt-and-braces: only admins can SELECT the owner_email column from the table
REVOKE SELECT (owner_email) ON public.commerce_booking_links FROM authenticated;
-- (admin UI runs through service-role-equivalent admin checks via is_admin; admins access owner_email via a dedicated grant)
-- Re-grant owner_email column SELECT only via a security-definer function for admins:
CREATE OR REPLACE FUNCTION public.admin_get_booking_link_owner_email(_id uuid)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE WHEN public.is_admin(auth.uid())
    THEN (SELECT owner_email FROM public.commerce_booking_links WHERE id = _id)
    ELSE NULL END
$$;
REVOKE ALL ON FUNCTION public.admin_get_booking_link_owner_email(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_get_booking_link_owner_email(uuid) TO authenticated;

-- 2. contact_submissions: tighten INSERT WITH CHECK with field-length/format constraints
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (
    length(name) > 0 AND length(name) <= 200
    AND length(email) > 0 AND length(email) <= 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(message) > 0 AND length(message) <= 5000
    AND (phone IS NULL OR length(phone) <= 30)
    AND enquiry_type IN (
      'Group Classes — Chiswick or Ealing',
      'Monthly Latin Friday — Tickets & Info',
      'Wedding Dance — Consultation',
      'Private Lessons — Enquiry',
      'Pura Ladies — Audition / Membership',
      'Corporate / Hen Party Event',
      'Corporate Booking — Team Building',
      'Private Group Party — Hen / Birthday',
      'Partnership / Venue Collaboration',
      'Gift Vouchers',
      'Online Classes',
      'General Enquiry'
    )
  );

-- 3. enquiries: tighten INSERT WITH CHECK with field validation and pin admin-only fields
DROP POLICY IF EXISTS "Anyone can submit enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit enquiry"
  ON public.enquiries
  FOR INSERT
  WITH CHECK (
    length(name) > 0 AND length(name) <= 200
    AND length(email) > 0 AND length(email) <= 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(subject) > 0 AND length(subject) <= 300
    AND length(message) > 0 AND length(message) <= 5000
    AND (phone IS NULL OR length(phone) <= 30)
    AND (source_page IS NULL OR length(source_page) <= 500)
    AND status = 'new'
    AND assigned_to IS NULL
    AND notes IS NULL
  );
