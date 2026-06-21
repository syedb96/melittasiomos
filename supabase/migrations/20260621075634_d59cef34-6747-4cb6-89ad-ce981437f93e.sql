ALTER TABLE public.commerce_prices DROP CONSTRAINT IF EXISTS commerce_prices_kind_check;
ALTER TABLE public.commerce_prices ADD CONSTRAINT commerce_prices_kind_check
  CHECK (kind IN ('combined','enquiry-only','social-only','drop-in','bundle-5','bundle-10','voucher','event-ticket','membership'));

INSERT INTO public.commerce_prices (slug, name, kind, amount_pence, currency, is_active)
VALUES
  ('chiswick-bundle-5', 'Chiswick 5-Class Bundle', 'bundle-5', 5500, 'GBP', true),
  ('chiswick-bundle-10', 'Chiswick 10-Class Bundle', 'bundle-10', 9900, 'GBP', true),
  ('chiswick-membership', 'Chiswick Monthly Membership', 'membership', 12000, 'GBP', true),
  ('ealing-bundle-5', 'Ealing 5-Class Bundle', 'bundle-5', 4200, 'GBP', true),
  ('ealing-bundle-10', 'Ealing 10-Class Bundle', 'bundle-10', 7800, 'GBP', true),
  ('ealing-membership', 'Ealing Monthly Membership', 'membership', 8500, 'GBP', true)
ON CONFLICT (slug) DO NOTHING;