CREATE OR REPLACE FUNCTION public.compute_enquiry_due_at(_subject text, _priority text)
RETURNS timestamptz LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT now() + (
    CASE
      WHEN _priority = 'urgent' THEN interval '4 hours'
      WHEN _priority = 'high' THEN interval '24 hours'
      WHEN _subject ILIKE '%Wedding%' THEN interval '24 hours'
      WHEN _subject ILIKE '%Corporate%' THEN interval '24 hours'
      WHEN _subject ILIKE '%Private%' THEN interval '48 hours'
      ELSE interval '72 hours'
    END
  );
$$;

REVOKE EXECUTE ON FUNCTION public.enquiry_log_changes() FROM public, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.testimonial_guard() FROM public, authenticated, anon;