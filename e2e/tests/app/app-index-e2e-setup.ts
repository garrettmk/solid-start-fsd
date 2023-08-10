import { testWithWorkerUser, TestWithWorkerUserTestFixtures, expect } from '@/e2e/setup/worker-user-setup.js';
import { AppHomePage } from './app-index-e2e-page.js';
export { expect };

export const test = testWithWorkerUser.extend<TestWithWorkerUserTestFixtures & {
  appHomePage: AppHomePage;
}>({
  appHomePage: async ({ page }, use) => {
    await page.goto('/app');
    await page.waitForLoadState('networkidle');

    use(new AppHomePage(page));
  },
});
