import { test, expect } from "@playwright/test";

test('should show the login button', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' });
})