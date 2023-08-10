import { UserProfile } from '@/entities/user-profile/schemas/user-profile-schema.js';
import { camelizeObject, shakeNullValues } from '@/shared/lib/util/objects-util.js';
import { AuthUser } from '@supabase/supabase-js';
import path from 'path';
import { SignInPage } from '../tests/app/sign-in/sign-in-e2e-page.js';
import { BASE_URL, BaseTestFixtures, BaseWorkerFixtures, test as baseTest, expect } from './base-setup.js';
export { expect };

export type TestWithWorkerUserTestFixtures = BaseTestFixtures;
export type TestWithWorkerUserWorkerFixtures = BaseWorkerFixtures & {
  workerStorageState: string;
  workerUser: AuthUser & { email: string, password: string };
  workerUserProfile: UserProfile
}

export const testWithWorkerUser = baseTest.extend<TestWithWorkerUserTestFixtures, TestWithWorkerUserWorkerFixtures>({
  workerUser: [async ({ supabase }, use, workerInfo) => {
    const email = `testuser-${workerInfo.workerIndex}@test.com`;
    const password = 'test1234';

    const { data, error } = await supabase.auth.admin.createUser({
      user_metadata: {
        fullName: 'Test User'
      },
      email,
      password,
      email_confirm: true
    });

    if (error)
      throw new Error(`Error creating test user: ${error.message}`);
    if (!data.user)
      throw new Error('No user returned from Supabase');

    await use({ ...data.user, email, password });

    await supabase.auth.admin.deleteUser(data.user.id);
  }, { scope: 'worker' }],

  workerUserProfile: [async ({ supabase, workerUser }, use) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', workerUser.id)
      .single();

      if (error)
        throw new Error(`Error fetching test user profile: ${error.message}`);
      if (!data)
        throw new Error('No user profile returned from Supabase');

      const profile = camelizeObject(shakeNullValues(data)) as UserProfile;
      await use(profile);
  }, { scope: 'worker' }],

  workerStorageState: [async ({ browser, workerUser }, use) => {
    const id = baseTest.info().parallelIndex;
    const fileName = path.resolve(baseTest.info().project.outputDir, `.auth/storage-state-${id}.json`);
    const { baseURL = BASE_URL } = baseTest.info().project.use;

    const page = await browser.newPage({ storageState: undefined, baseURL });
    await SignInPage.signIn(page, workerUser.email, workerUser.password);
    await expect(page).toHaveURL('/app');
    await page.context().storageState({ path: fileName });
    await page.close();
    
    await use(fileName);
  }, { scope: 'worker' }],

  storageState: ({ workerStorageState }, use) => use(workerStorageState),
});