import { useSession } from "@/entities/session";
import { Redirect } from "@/shared/ui";
import { SignInOverlay } from "@/widgets/session";

export function SignIn() {
  const session = useSession();
  const isSignedIn = () => !!session();

  return (
    <main>
      <Redirect to="/app" when={isSignedIn} />
      <SignInOverlay />
    </main>
  );
}

export default SignIn;
