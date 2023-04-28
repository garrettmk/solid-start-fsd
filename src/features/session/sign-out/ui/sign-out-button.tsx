import { signOut } from "../lib";

export function SignOutButton() {
  return <button onClick={signOut}>Sign Out</button>;
}
