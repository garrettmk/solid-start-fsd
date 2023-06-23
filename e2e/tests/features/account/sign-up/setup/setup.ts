import { test as baseSetup, expect } from '@/e2e/setup/setup.js';
import { signUpInfo } from './data.js';
import { SignUpPage } from './sign-up-page.js';
export { expect };

export const test = baseSetup.extend({
  signUpPage: async ({ page }, use) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    use(new SignUpPage(page));
  },

  signUpInfo: async ({ supabase }, use) => {
    await use(signUpInfo);

    const { data: userId, error } = await supabase.rpc(
      'get_user_id_from_email',
      { email_: signUpInfo.email }
    );

    if (userId)
      await supabase.auth.admin.deleteUser(userId);
  }
});
