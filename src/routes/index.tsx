import { SessionData, useSession } from "@/entities/session";
import { signInWithPassword } from "@/features/session/sign-in-with-password";
import { SignOutButton } from "@/features/session/sign-out";
import { createEffect } from "solid-js";
import { A, Title } from "solid-start";

export default function Home() {
  const session = useSession();
  const signIn = () =>
    signInWithPassword({
      email: "garrettmyrick@gmail.com",
      password: "foofoo",
    });

  createEffect(() => {
    console.log(session());
  });

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <A href="/app/">Go to app</A>
      <SessionData session={session()} />
      <button onClick={signIn}>Sign In</button>
      <SignOutButton />
    </main>
  );
}
