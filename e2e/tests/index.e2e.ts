import { test, expect } from "@playwright/test";

test('should show the login button', async ({ page }) => {
  await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible;
})