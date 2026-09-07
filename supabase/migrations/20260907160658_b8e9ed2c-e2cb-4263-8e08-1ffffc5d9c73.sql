CREATE TABLE public.admin_emails (
  email text PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_emails (email) VALUES
  ('charles@nextrootventures.com'),
  ('conniechsieh@gmail.com'),
  ('charles.hsieh6@gmail.com')
ON CONFLICT (email) DO NOTHING;

CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text;
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN RETURN false; END IF;
  _email := lower(coalesce(auth.jwt() ->> 'email', ''));
  IF _email = '' THEN RETURN false; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.admin_emails WHERE lower(email) = _email) THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (_uid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;