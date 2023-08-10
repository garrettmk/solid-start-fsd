import { test, expect } from './app-index-e2e-setup.js';


test('should show the sign-in overlay if unauthenticated', async ({ browser }) => {
  const page = await browser.newPage({ storageState: undefined });
  await page.goto('/app');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('#authentication-modal')).toBeVisible();
});

test('should toggle dark mode', async ({ appHomePage }) => {
  const getHasDarkModeClass = async () => appHomePage.page.$eval('html', (html) => {
    return html.classList.contains('dark')
  });

  const isDark = await getHasDarkModeClass();
  await appHomePage.userMenu.toggleDarkMode();
  expect(await getHasDarkModeClass()).toBe(!isDark);

  await appHomePage.userMenu.toggleDarkMode();
  expect(await getHasDarkModeClass()).toBe(isDark);
});

test('should sign out', async ({ appHomePage }) => {
  await appHomePage.userMenu.signOut();

  await test.expect(appHomePage.page.getByTestId('sign-in-with-password-form')).toBeVisible();
});