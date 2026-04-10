
-- Add validation trigger for contact_submissions
-- Using a trigger instead of CHECK constraints per best practices

CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Validate name length
  IF length(NEW.name) > 200 THEN
    RAISE EXCEPTION 'Name must be less than 200 characters';
  END IF;

  -- Validate email length
  IF length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be less than 255 characters';
  END IF;

  -- Validate message length
  IF length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message must be less than 5000 characters';
  END IF;

  -- Validate phone length if provided
  IF NEW.phone IS NOT NULL AND length(NEW.phone) > 30 THEN
    RAISE EXCEPTION 'Phone must be less than 30 characters';
  END IF;

  -- Validate enquiry_type is from allowed list
  IF NEW.enquiry_type NOT IN (
    'Group Classes — Chiswick or Ealing',
    'Monthly Latin Friday — Tickets & Info',
    'Wedding Dance — Consultation',
    'Private Lessons — Enquiry',
    'Pura Ladies — Audition / Membership',
    'Corporate / Hen Party Event',
    'Gift Vouchers',
    'Online Classes',
    'General Enquiry'
  ) THEN
    RAISE EXCEPTION 'Invalid enquiry type';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_contact_submission_trigger
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_contact_submission();
