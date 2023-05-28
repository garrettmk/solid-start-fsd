import { useSignOut } from "../lib";

export function SignOutButton() {
  const signOut = useSignOut();
  return <button onClick={signOut}>Sign Out</button>;
}
