CREATE OR REPLACE FUNCTION public.validate_enquiry_submission()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  IF length(NEW.name) > 200 THEN RAISE EXCEPTION 'Name must be less than 200 characters'; END IF;
  IF length(NEW.email) > 255 THEN RAISE EXCEPTION 'Email must be less than 255 characters'; END IF;
  IF length(NEW.subject) > 300 THEN RAISE EXCEPTION 'Subject must be less than 300 characters'; END IF;
  IF length(NEW.message) > 5000 THEN RAISE EXCEPTION 'Message must be less than 5000 characters'; END IF;
  IF NEW.phone IS NOT NULL AND length(NEW.phone) > 30 THEN RAISE EXCEPTION 'Phone must be less than 30 characters'; END IF;
  IF NEW.source_page IS NOT NULL AND length(NEW.source_page) > 500 THEN RAISE EXCEPTION 'Source page too long'; END IF;

  -- Force admin-only fields to safe defaults on every insert.
  -- Admins update these via UPDATE policy after the row is created.
  NEW.status := 'new';
  NEW.notes := NULL;
  NEW.assigned_to := NULL;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_enquiry_submission_trigger ON public.enquiries;
CREATE TRIGGER validate_enquiry_submission_trigger
BEFORE INSERT ON public.enquiries
FOR EACH ROW
EXECUTE FUNCTION public.validate_enquiry_submission();