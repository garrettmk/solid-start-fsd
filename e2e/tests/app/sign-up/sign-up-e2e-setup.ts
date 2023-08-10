import { testWithWorkerUser, expect } from '@/e2e/setup/worker-user-setup.js';
import { SignUpPage } from './sign-up-page.js';
import { signUpInfo } from './sign-up-e2e-machine.js';
export { expect };

export const test = testWithWorkerUser.extend({
  signUpPage: async ({ page }, use) => {
    await page.goto('/sign-up');
    await page.waitForLoadState('networkidle');

    use(new SignUpPage(page));
  },

  signUpInfo: async ({ supabase }, use) => {
    await use(signUpInfo);

    const { data: userId } = await supabase.rpc(
      'get_user_id_from_email',
      { email_: signUpInfo.email }
    );

    if (userId)
      await supabase.auth.admin.deleteUser(userId);
  }
});
