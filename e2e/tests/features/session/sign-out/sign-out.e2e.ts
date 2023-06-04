import { test } from "../../../../setup/setup.js";
import { makeSignInContext } from "./context.js";

test.describe('sign-out', () => {
  test.beforeEach(async ({ supabase, page }) => {
    const users = await supabase.auth.admin.listUsers();
    await Promise.all(users.data.users.map(async (user) => {
      await supabase.auth.admin.deleteUser(user.id);
    }));

    await supabase.auth.admin.createUser({
      email: 'test@test.com',
      password: 'test1234',
      email_confirm: true
    });

    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');

    const { emailInput, passwordInput, signInButton } = makeSignInContext(page);
    await emailInput.type('test@test.com');
    await passwordInput.type('test1234');
    await signInButton.click();

    await page.waitForLoadState('networkidle');
    await test.expect(page).toHaveURL('/app');
  });

  test('should sign out', async ({ page }) => {
    const signOutButton = await page.getByTestId('sign-out-button');
    await signOutButton.click();

    await test.expect(page.getByTestId('sign-in-with-password-form')).toBeVisible();
  });

});