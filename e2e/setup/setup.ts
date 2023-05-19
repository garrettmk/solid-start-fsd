import { test as base, expect } from '@playwright/test';
import { SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from '@/shared/services/supabase/config/supabase-config.js';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

export const test = base.extend<{ supabase: SupabaseClient }>({
  supabase: async ({ page }, use) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false
      }
    });

    await use(supabase);
  }
});

export { expect } from '@playwright/test';