import { dependency, provider } from "tidi";
import { SupabaseDependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";

/**
 * A dependency for a function that signs the current user out.
 */
export const SignOutDependency = dependency<() => Promise<void>>({
  name: 'SignOut'
});

/**
 * Provides a function that signs the current user out.
 */
export const SignOutProvider = provider({
  provides: SignOutDependency,
  requires: [SupabaseDependency],
  use: (supabase) => async () => {
    await supabase.auth.signOut()
  }
});

/**
 * Convenience hook for using the sign out function.
 * 
 * @returns 
 */
export function useSignOut(): () => Promise<void> {
  return useContainer(SignOutDependency);
}