import { test as baseSetup, expect } from '@/e2e/setup/setup.js';
import { AppHomePage } from './app-home-page.js';
export { expect };

export const test = baseSetup.extend({
  appHomePage: async ({ page }, use) => {
    await page.goto('/app');
    await page.waitForLoadState('networkidle');

    use(new AppHomePage(page));
  },
});
