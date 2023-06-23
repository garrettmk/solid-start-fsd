import { SupabaseClient } from '@supabase/supabase-js';
import { SignUpPage } from './sign-up-page.js';

export type TestContext = {
  signUpPage: SignUpPage,
  supabase: SupabaseClient
};
