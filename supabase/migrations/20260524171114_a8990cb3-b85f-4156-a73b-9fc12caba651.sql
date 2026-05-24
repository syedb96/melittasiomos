-- Add platform column to testimonials with strict allowed values
ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS platform text NOT NULL DEFAULT 'personal';

ALTER TABLE public.testimonials
  DROP CONSTRAINT IF EXISTS testimonials_platform_check;

ALTER TABLE public.testimonials
  ADD CONSTRAINT testimonials_platform_check
  CHECK (platform IN ('google', 'personal'));

-- Backfill from existing source_type/source_url so we don't claim Google
-- reviews that have no verifiable URL.
UPDATE public.testimonials
SET platform = CASE
  WHEN source_type = 'google' AND source_url IS NOT NULL AND length(trim(source_url)) > 0
    THEN 'google'
  ELSE 'personal'
END;

-- Validation trigger: block fake Google review metadata at the DB layer.
-- A row tagged platform = 'google' MUST carry a source_url so the schema
-- emitter can prove the review is verifiable.
CREATE OR REPLACE FUNCTION public.validate_testimonial_platform()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.platform = 'google'
     AND (NEW.source_url IS NULL OR length(trim(NEW.source_url)) = 0) THEN
    RAISE EXCEPTION 'Google-platform testimonials require a source_url linking to the live Google review';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_testimonial_platform_trg ON public.testimonials;
CREATE TRIGGER validate_testimonial_platform_trg
BEFORE INSERT OR UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.validate_testimonial_platform();