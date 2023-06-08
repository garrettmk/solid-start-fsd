import { AppHomePage } from "../../../setup/app-home-page.js";
import { test } from "../../../setup/setup.js";

test.describe('sign-out', () => {
  test('should sign out', async ({ page }) => {
    await page.goto('/app');
    const appHomePage = new AppHomePage(page);
    await appHomePage.signOut();

    await test.expect(appHomePage.page.getByTestId('sign-in-with-password-form')).toBeVisible();
  });

});