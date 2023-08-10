import { expect, testWithTestUser } from '@/e2e/setup/test-user-setup.js';
import { ProfilePage } from './profile-e2e-page.js';
export { expect };


export const test = testWithTestUser.extend({
  profilePage: async ({ browser, testUserProfile }, use) => {
    const page = await browser.newPage();
    await page.goto('/app/account/profile');
    await page.waitForLoadState('networkidle');

    use(new ProfilePage(page, testUserProfile));
  }
});