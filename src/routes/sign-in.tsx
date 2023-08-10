import { useSession } from "@/entities/session";
import { SignInWithPasswordForm, useSignInWithPassword } from "@/features/session/sign-in-with-password";
import { AppURLDependency } from "@/shared/lib";
import { Error, Heading, Panel, Redirect, useContainer } from "@/shared/ui";

export function SignIn() {
  const appURL = useContainer(AppURLDependency);
  const session = useSession();
  const isSignedIn = () => !!session();
  const [signInResult, signInWithPassword] = useSignInWithPassword();

  return (
    <main class="fixed inset-0 bg-gradient-to-r from-blue-700  via-blue-500 to-sky-500 animate-gradient bg-[size:400%] flex items-center justify-center">
      <Redirect to={appURL} when={isSignedIn()} />
      <Panel
        id="authentication-modal"
        class="p-6 w-96 min-w-lg shadow-2xl"
      >
        <Heading class="text-2xl mb-4">Sign in to our platform</Heading>
        <SignInWithPasswordForm onSubmit={signInWithPassword} />
        <Error when={signInResult.error} class="mt-3 text-sm">
          {signInResult.error?.message}
        </Error>
      </Panel>
    </main>
  );
}

export default SignIn;
