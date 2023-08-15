import { dependency, provider } from "tidi";
import { SupabaseDependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";
import { createResource, createSignal } from "solid-js";
import { PasswordCredentials } from "../schemas";


export const SignInWithPasswordDependency = dependency<(credentials: PasswordCredentials) => Promise<void>>({
  name: 'SIGN_IN_WITH_PASSWORD'
});

export const SignInWithPasswordProvider = provider({
  provides: SignInWithPasswordDependency,
  requires: [SupabaseDependency],
  use: (supabase) => async (credentials: PasswordCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error)
      throw error;
  }
})

export function useSignInWithPassword() {
  const signInWithPassword = useContainer(SignInWithPasswordDependency);
  const [variables, setVariables] = createSignal<PasswordCredentials>();
  const [result] = createResource(variables, signInWithPassword);

  return [result, setVariables] as const;
}
