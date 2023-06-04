import { useSession } from "@/entities/session";
import { SignInWithPasswordForm, useSignInWithPassword } from "@/features/session/sign-in-with-password";
import { AppURLDependency } from "@/shared/lib";
import { Heading, Panel, Redirect, useContainer } from "@/shared/ui";
import { Show } from "solid-js";

export function SignIn() {
  const appURL = useContainer(AppURLDependency);
  const session = useSession();
  const isSignedIn = () => !!session();
  const [signInResult, signInWithPassword] = useSignInWithPassword();

  return (
    <main class="fixed inset-0 bg-gradient-to-r from-blue-700  via-blue-500 to-sky-500 animate-gradient bg-[size:400%] flex items-center justify-center">
      <Redirect to={appURL} when={isSignedIn()} />
      <Panel class="p-6 w-96 min-w-lg shadow-2xl">
        <Heading class="text-2xl mb-4">Sign in to our platform</Heading>
        <SignInWithPasswordForm onSubmit={signInWithPassword} />
        <Show when={signInResult.error}>
          <p role="alert" class="mt-3 text-xs text-red-600 dark:text-red-400">
            {signInResult.error?.message}
          </p>
        </Show>
      </Panel>
    </main>
  );
}

export default SignIn;
