import { test, expect } from '../../setup/setup.js';


test('should redirect to sign-in if unauthenticated', async ({ page }) => {
  await page.goto('/app');
  await page.waitForURL('/sign-in');

  await expect(page).toHaveURL(/sign-in$/);
});


test.describe('/app', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
  });
});