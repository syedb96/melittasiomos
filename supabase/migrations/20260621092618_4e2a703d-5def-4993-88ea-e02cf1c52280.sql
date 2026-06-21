-- 1) Venue change audit trigger
CREATE OR REPLACE FUNCTION public.log_commerce_venue_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _diff jsonb := '{}'::jsonb;
  _key text;
  _old_val jsonb;
  _new_val jsonb;
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.admin_audit_log (action, entity_type, entity_id, entity_label, metadata)
    VALUES ('commerce_venue.create', 'commerce_venues', NEW.id::text, NEW.slug, jsonb_build_object('after', to_jsonb(NEW)));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.admin_audit_log (action, entity_type, entity_id, entity_label, metadata)
    VALUES ('commerce_venue.delete', 'commerce_venues', OLD.id::text, OLD.slug, jsonb_build_object('before', to_jsonb(OLD)));
    RETURN OLD;
  ELSE
    FOR _key IN SELECT key FROM jsonb_each(to_jsonb(NEW)) LOOP
      _old_val := to_jsonb(OLD) -> _key;
      _new_val := to_jsonb(NEW) -> _key;
      IF _old_val IS DISTINCT FROM _new_val AND _key NOT IN ('updated_at') THEN
        _diff := _diff || jsonb_build_object(_key, jsonb_build_object('before', _old_val, 'after', _new_val));
      END IF;
    END LOOP;
    IF _diff <> '{}'::jsonb THEN
      INSERT INTO public.admin_audit_log (action, entity_type, entity_id, entity_label, metadata)
      VALUES ('commerce_venue.update', 'commerce_venues', NEW.id::text, NEW.slug, jsonb_build_object('diff', _diff));
    END IF;
    RETURN NEW;
  END IF;
END;
$$;

DROP TRIGGER IF EXISTS trg_audit_commerce_venues ON public.commerce_venues;
CREATE TRIGGER trg_audit_commerce_venues
AFTER INSERT OR UPDATE OR DELETE ON public.commerce_venues
FOR EACH ROW EXECUTE FUNCTION public.log_commerce_venue_changes();

-- 2) Prevent duplicate availability/exception entries for the same slot on the same date
CREATE UNIQUE INDEX IF NOT EXISTS uq_schedule_exception_slot_date_type
  ON public.commerce_schedule_exceptions (slot_id, exception_date, exception_type);