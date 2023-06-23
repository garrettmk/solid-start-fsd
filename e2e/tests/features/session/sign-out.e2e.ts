import { test } from "./setup/setup.js";

test.describe('sign-out', () => {
  test('should sign out', async ({ appHomePage }) => {
    await appHomePage.signOut();

    await test.expect(appHomePage.page.getByTestId('sign-in-with-password-form')).toBeVisible();
  });

});