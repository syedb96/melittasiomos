
-- Remove unused sensitive column entirely (no rows have it populated)
ALTER TABLE public.commerce_booking_links DROP COLUMN IF EXISTS owner_email;

-- Drop the helper function and special policies/view added in prior migration
DROP FUNCTION IF EXISTS public.admin_get_booking_link_owner_email(uuid);
DROP POLICY IF EXISTS "Authenticated can read active booking links" ON public.commerce_booking_links;
DROP VIEW IF EXISTS public.commerce_booking_links_public;

-- Restore simple public read access to active booking links
GRANT SELECT ON public.commerce_booking_links TO anon;
CREATE POLICY "Public can read active booking links"
  ON public.commerce_booking_links
  FOR SELECT
  USING (is_active = true);
