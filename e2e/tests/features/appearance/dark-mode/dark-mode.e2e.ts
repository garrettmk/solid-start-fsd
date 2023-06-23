import { test, expect } from './setup/setup.js';


test.describe('dark mode', () => {
  test('should toggle dark mode', async ({ appHomePage }) => {
    const getHasDarkModeClass = async () => appHomePage.page.$eval('html', (html) => {
      return html.classList.contains('dark')
    });

    let isDark = await getHasDarkModeClass();
    await appHomePage.toggleDarkMode();
    expect(await getHasDarkModeClass()).toBe(!isDark);

    await appHomePage.toggleDarkMode();
    expect(await getHasDarkModeClass()).toBe(isDark);
  });
});