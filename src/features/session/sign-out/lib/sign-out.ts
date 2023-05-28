import { dependency, provider } from "@/shared/lib";
import { SupabaseDependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";

export const SignOutDependency = dependency<() => Promise<void>>({
  name: 'SignOut'
});

export const SignOutProvider = provider({
  provides: SignOutDependency,
  requires: [SupabaseDependency],
  use: (supabase) => async () => { supabase.auth.signOut() }
});


export function useSignOut(): () => Promise<void> {
  return useContainer(SignOutDependency);
}