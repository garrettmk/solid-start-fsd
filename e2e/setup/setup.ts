import { NewAccountInput } from '@/features/account/sign-up/index.js';
import { test as base, expect } from '@playwright/test';
import { AuthUser, SupabaseClient, createClient } from '@supabase/supabase-js';
import path from 'path';
import { AppHomePage } from '../tests/app/setup/app-home-page.js';
import { SignInPage } from '../tests/features/session/setup/sign-in-page.js';
import { SiteHomePage } from './site-home-page.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? 'http://localhost:3000';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export type TestFixtures = {
  siteHomePage: SiteHomePage;
  signUpInfo: NewAccountInput;
  signInPage: SignInPage;
  appHomePage: AppHomePage;
}

export type WorkerFixtures = {
  supabase: SupabaseClient;
  workerUser: AuthUser & { email: string, password: string };
  workerStorageState: string;
};

export type Fixtures = TestFixtures & WorkerFixtures;

export const test = base.extend<TestFixtures, WorkerFixtures>({
  supabase: [async ({ }, use) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false
      }
    });

    await use(supabase);
  }, { scope: 'worker' }],

  workerUser: [async ({ supabase }, use, workerInfo) => {
    const email = `testuser-${workerInfo.workerIndex}@test.com`;
    const password = 'test1234';

    const { data, error } = await supabase.auth.admin.createUser({
      user_metadata: {
        fullName: 'Test User'
      },
      email,
      password,
      email_confirm: true
    });

    await expect(error).toBeNull();
    await expect(data).not.toBeNull();

    await use({ ...data.user!, email, password });

    await supabase.auth.admin.deleteUser(data.user!.id);
  }, { scope: 'worker' }],

  workerStorageState: [async ({ browser, workerUser }, use, workerInfo) => {
    const id = test.info().parallelIndex;
    const fileName = path.resolve(test.info().project.outputDir, `.auth/storage-state-${id}.json`);
    const { baseURL = 'http://localhost:3000' } = test.info().project.use;
    const page = await browser.newPage({ storageState: undefined, baseURL });
    await SignInPage.signIn(page, workerUser.email, workerUser.password);
    await expect(page).toHaveURL('/app');
    await page.context().storageState({ path: fileName });
    await page.close();
    await use(fileName);
  }, { scope: 'worker' }],

  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  siteHomePage: async ({ browser }, use) => {
    const page = await browser.newPage({ storageState: undefined });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await use(new SiteHomePage(page));
  },
});

export { expect } from '@playwright/test';
