import { test } from '../../../../setup/setup.js';
import { makeTestContext } from './context.js';


test.describe('sign-in-with-password', () => {
  test.beforeEach(async ({ supabase }) => {
    const users = await supabase.auth.admin.listUsers();
    await Promise.all(users.data.users.map(async (user) => {
      await supabase.auth.admin.deleteUser(user.id);
    }));

    await supabase.auth.admin.createUser({
      email: 'test@test.com',
      password: 'test1234',
      email_confirm: true
    });
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loginButton = await page.getByRole('button', { name: /login/i });
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await test.expect(page).toHaveURL('/sign-in');
  });

  test('should sign in with password', async ({ page }) => {
    const { emailInput, passwordInput, signInButton } = makeTestContext(page);

    await emailInput.type('test@test.com');
    await passwordInput.type('test1234');
    await signInButton.click();

    await page.waitForLoadState('networkidle');
    await test.expect(page).toHaveURL('/app');
  });

  test('should fail if given wrong email', async ({ page }) => {
    const { emailInput, passwordInput, signInButton, errorMessage } = makeTestContext(page);

    await emailInput.type('foo@test.com');
    await passwordInput.type('test1234');
    await signInButton.click();

    await test.expect(errorMessage).toBeVisible();
  });

  test('should fail if given wrong password', async ({ page }) => {
    const { emailInput, passwordInput, signInButton, errorMessage } = makeTestContext(page);

    await emailInput.type('test@test.com');
    await passwordInput.type('notthepassword');
    await signInButton.click();

    await test.expect(errorMessage).toBeVisible();
  });
});