/*
  Tenants
*/
DROP TABLE IF EXISTS public.tenants;

CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
  CONSTRAINT name_length CHECK (char_length(name) >= 3),
  CONSTRAINT slug_length CHECK (char_length(slug) >= 3)
);

COMMENT ON TABLE public.tenants IS 'Tenants';

/*
  Policies
*/

ALTER TABLE public.tenants enable ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read" ON public.tenants;
CREATE POLICY "read" ON public.tenants FOR
  SELECT USING (TRUE);
COMMENT ON POLICY "read" ON public.tenants IS 'Tenants are viewable by everyone.';

DROP POLICY IF EXISTS "create" ON public.tenants;
CREATE POLICY "create" ON public.tenants FOR
  INSERT WITH CHECK (public.is_super_admin());
COMMENT ON POLICY "create" ON public.tenants IS 'Only super admins can create tenants.';

DROP POLICY IF EXISTS "update" ON public.tenants;
CREATE POLICY "update" ON public.tenants FOR
  UPDATE USING (
    public.is_super_admin()
  );
COMMENT ON POLICY "update" ON public.tenants IS 'Only super admins can update tenants.';

DROP POLICY IF EXISTS "delete" ON public.tenants;
CREATE POLICY "delete" ON public.tenants FOR
  DELETE USING (
    public.is_super_admin()
  );
COMMENT ON POLICY "delete" ON public.tenants IS 'Only super admins can delete tenants.';