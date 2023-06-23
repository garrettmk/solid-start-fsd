-- Active: 1686203442613@@127.0.0.1@54322@postgres
/*
    Utilities
*/

DROP FUNCTION get_user_id_from_email;

CREATE OR REPLACE FUNCTION get_user_id_from_email(email_ TEXT) RETURNS UUID
AS $$
  DECLARE
    result UUID;
  BEGIN
    SELECT id INTO result
    FROM auth.users u 
    WHERE u.email = email_;

    IF FOUND THEN
      RETURN result;
    ELSE
      RETURN NULL;
    END IF;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_initials(name TEXT) RETURNS TEXT
AS $$
  DECLARE
    initials TEXT := '';
    word TEXT := '';
  BEGIN
    FOR word IN (SELECT regexp_split_to_table(name, E'\\s+') LIMIT 2) LOOP
      initials := initials || upper(substring(word, 1, 1));
    END LOOP;
    RETURN initials;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.is_super_admin() RETURNS BOOLEAN
AS $$
  DECLARE
    result BOOLEAN;
  BEGIN
    SELECT 
      is_super_admin 
    INTO 
      result 
    FROM 
      auth.users 
    WHERE 
      id = auth.uid();
    RETURN result;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

/*
    User profiles

    User profiles store public information about each user. Users should be able
    to view everyone's profile, but only edit their own profile. We also set up
    a trigger to automatically create a profile row when a user is registered.
*/
DROP TABLE IF EXISTS public.user_profiles;

CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  preferred_name TEXT NOT NULL,
  avatar_url TEXT,
  avatar_initials TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_sign_in_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT fullname_length CHECK (char_length(full_name) >= 3),
  CONSTRAINT preferred_name_length CHECK (char_length(preferred_name) >= 3),
  CONSTRAINT initials_length CHECK (avatar_initials ~ '^[a-zA-Z]{2}$')
);

COMMENT ON TABLE public.user_profiles IS 'Public user information';

/*
    Policies

    User profiles are public information, so they are viewable by everyone.
    However, only the owner may update a profile. Profiles can not be deleted
    by users - they area automatically removed if a user is deleted.
*/
ALTER TABLE public.user_profiles enable ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read" ON PUBLIC.user_profiles;
CREATE POLICY "read" ON public.user_profiles FOR
  SELECT USING (TRUE);
COMMENT ON POLICY "read" ON public.user_profiles IS 'User profiles are viewable by everyone.';

DROP POLICY IF EXISTS "create" ON PUBLIC.user_profiles;
CREATE POLICY "create" ON public.user_profiles FOR
  INSERT WITH CHECK (auth.uid() = id);
COMMENT ON POLICY "create" ON public.user_profiles IS 'Users can insert their own profile.';

DROP POLICY IF EXISTS "update" ON PUBLIC.user_profiles;
CREATE POLICY "update" ON public.user_profiles FOR
  UPDATE USING (
    auth.uid() = id OR
    public.is_super_admin()
  );
COMMENT ON POLICY "update" ON public.user_profiles IS 'Users can update own profile.';


/*
    Triggers

    - A profile is created automatically when a user is registered.
    - If the user table is updated, the profile table is updated to stay
      in sync.
    - If a user is deleted, the profile should be automatically removed.
*/

-- Create a profile automatically
CREATE OR REPLACE FUNCTION public.handle_user_created() RETURNS TRIGGER 
AS $$ BEGIN
  INSERT INTO 
    public.user_profiles (id, full_name, preferred_name, avatar_url, avatar_initials, created_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'fullName',
    coalesce(NEW.raw_user_meta_data->>'preferredName', split_part(NEW.raw_user_meta_data->>'fullName', ' ', 1)),
    NEW.raw_user_meta_data->>'avatarUrl',
    coalesce(NEW.raw_user_meta_data->>'avatarInitials', public.get_initials(NEW.raw_user_meta_data->>'fullName')),
    NEW.created_at
  );
  RETURN NEW;
END; $$ LANGUAGE PLPGSQL SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_user_created
  AFTER INSERT ON auth.users 
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_created();

-- Update the profile automatically
CREATE OR REPLACE FUNCTION public.handle_user_updated() RETURNS TRIGGER 
AS $$ BEGIN
  UPDATE 
    public.user_profiles p 
  SET
    full_name = coalesce(NEW.raw_user_meta_data->>'fullName', full_name),
    preferred_name = coalesce(NEW.raw_user_meta_data->>'preferredName', preferred_name),
    avatar_url = coalesce(NEW.raw_user_meta_data->>'avatarUrl', avatar_url),
    avatar_initials = coalesce(NEW.raw_user_meta_data->>'avatarInitials', avatar_initials),
    last_sign_in_at = NEW.last_sign_in_at
  WHERE
    p.id = NEW.id;
  RETURN NEW;
END $$ LANGUAGE PLPGSQL SECURITY DEFINER;

CREATE OR REPLACE TRIGGER ON_AUTH_USER_UPDATED
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_updated();

-- Delete profiles automatically
CREATE OR REPLACE FUNCTION public.handle_user_deleted() RETURNS TRIGGER
AS $$ BEGIN
  DELETE FROM
    public.user_profiles p
  WHERE
    p.id = OLD.id;
  RETURN OLD;
END; $$ LANGUAGE PLPGSQL SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_deleted
  BEFORE DELETE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_deleted();
