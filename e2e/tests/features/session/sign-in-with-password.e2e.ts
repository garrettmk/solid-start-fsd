import { test } from '../../../setup/setup.js';


test.describe('sign-in-with-password', () => {
  test('should be able to reach sign-in from home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loginButton = await page.getByRole('button', { name: /login/i });
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await test.expect(page).toHaveURL('/sign-in');
  });

  test('should sign in with password', async ({ signInPage, workerUser }) => {
    const { email, password } = workerUser;

    await signInPage.signIn(email, password);

    await test.expect(signInPage.page).toHaveURL('/app');
  });

  test('should fail if given wrong email', async ({ signInPage, workerUser }) => {
    const { password, email } = workerUser;
    const wrongEmail = 'nottherightemail@foo.com';

    await signInPage.signIn(wrongEmail, password);

    await test.expect(signInPage.errorMessage).toBeVisible();
  });

  test('should fail if given wrong password', async ({ signInPage, workerUser }) => {
    const { password, email } = workerUser;
    const wrongPassword = 'nottherightpassword';

    await signInPage.signIn(email, wrongPassword);

    await test.expect(signInPage.errorMessage).toBeVisible();
  });
});