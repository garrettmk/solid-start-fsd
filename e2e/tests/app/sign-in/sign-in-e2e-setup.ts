import { testWithWorkerUser, expect } from '@/e2e/setup/worker-user-setup.js';
import { SignInPage } from './sign-in-e2e-page.js';
import { AppHomePage } from '../app-index-e2e-page.js';
export { expect };

export const test = testWithWorkerUser.extend({
  appHomePage: async ({ page }, use) => {
    await page.goto('/app');
    await page.waitForLoadState('networkidle');

    use(new AppHomePage(page));
  },

  signInPage: async ({ browser }, use) => {
    const page = await browser.newPage({ storageState: undefined });
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');

    use(new SignInPage(page));
  }
});