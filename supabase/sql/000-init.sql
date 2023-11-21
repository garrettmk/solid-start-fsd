/*
  Super admins
*/
CREATE ROLE super_admin INHERIT;
GRANT postgres TO super_admin;
GRANT authenticated TO super_admin;
GRANT super_admin TO authenticator;
GRANT CREATE ON DATABASE postgres TO super_admin;