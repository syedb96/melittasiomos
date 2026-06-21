UPDATE public.commerce_venues
SET
  transport_html = 'Turnham Green (District Line) — 5 min walk',
  parking_html = 'Free on-street parking after 6:30pm on surrounding roads',
  accessibility_html = 'Step-free from the street. Dance floor on ground level. Accessible toilet available.',
  updated_at = now()
WHERE slug = 'the-george-iv-chiswick';

UPDATE public.commerce_venues
SET
  transport_html = 'West Ealing (Elizabeth Line) — 10 min walk',
  parking_html = 'Free car park at the venue. On-street parking also available.',
  accessibility_html = 'Step-free entrance and accessible WC on site.',
  updated_at = now()
WHERE slug = 'the-drayton-court-ealing';