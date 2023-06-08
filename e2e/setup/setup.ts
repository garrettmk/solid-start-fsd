import { test as base, expect } from '@playwright/test';
import { AuthUser, SupabaseClient, createClient } from '@supabase/supabase-js';
import path from 'path';
import { AppHomePage } from './app-home-page.js';
import { SignInPage } from './sign-in-page.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? 'http://localhost:3000';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

type TestFixtures = {
  signInPage: SignInPage;
  appHomePage: AppHomePage;
}

type WorkerFixtures = {
  supabase: SupabaseClient;
  workerUser: AuthUser & { email: string, password: string };
  workerStorageState: string;
};

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

  signInPage: async ({ browser }, use) => {
    const page = await browser.newPage({ storageState: undefined });
    const signInPage = await SignInPage.from(page);
    await use(signInPage);
  },

  appHomePage: async ({ page, workerUser }, use) => {
    await page.goto('/app');
    await page.waitForLoadState('networkidle');

    await use(new AppHomePage(page));
  }
});

export { expect } from '@playwright/test';
