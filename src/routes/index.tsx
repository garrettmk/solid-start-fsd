import { Title } from "solid-start";
import { Counter } from "@/shared/ui";
import { signInWithPassword } from "@/features/session/sign-in-with-password";
import { SessionData, useSession } from "@/entities/session";
import { createEffect } from "solid-js";
import { SignOutButton } from "@/features/session/sign-out";

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
      <Counter />
      <SessionData session={session()} />
      <button onClick={signIn}>Sign In</button>
      <SignOutButton />
    </main>
  );
}
