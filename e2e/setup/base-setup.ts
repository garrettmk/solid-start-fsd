import { test as base } from '@playwright/test';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SiteHomePage } from './site-home-page.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? 'http://localhost:3000';
// const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

// eslint-disable-next-line @typescript-eslint/ban-types
export type BaseTestFixtures = {
  siteHomePage: SiteHomePage;
};

export type BaseWorkerFixtures = {
  supabase: SupabaseClient;
};

export type Fixtures = BaseTestFixtures & BaseWorkerFixtures;

export const test = base.extend<BaseTestFixtures, BaseWorkerFixtures>({
  // eslint-disable-next-line no-empty-pattern
  supabase: [async ({}, use) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false
      }
    });

    await use(supabase);
  }, { scope: 'worker' }],

  siteHomePage: async ({ browser }, use) => {
    const page = await browser.newPage({ storageState: undefined });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await use(new SiteHomePage(page));
  },
});

export { expect } from '@playwright/test';
