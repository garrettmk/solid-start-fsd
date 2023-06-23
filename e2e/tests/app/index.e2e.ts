import { test, expect } from './setup/setup.js';


test('should show the sign-in overlay if unauthenticated', async ({ browser }) => {
  const page = await browser.newPage({ storageState: undefined });
  await page.goto('/app');

  await expect(page.locator('#authentication-modal')).toBeVisible();
});
