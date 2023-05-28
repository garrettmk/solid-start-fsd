import { useSession } from "@/entities/session";
import { AppURLDependency } from "@/shared/lib";
import { Redirect, useContainer } from "@/shared/ui";
import { SignInOverlay } from "@/widgets/session";

export function SignIn() {
  const appURL = useContainer(AppURLDependency);
  const session = useSession();
  const isSignedIn = () => !!session();

  return (
    <main>
      <Redirect to={appURL} when={isSignedIn} />
      <SignInOverlay />
    </main>
  );
}

export default SignIn;
