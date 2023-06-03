import { SignInWithPasswordProvider } from "@/features/session/sign-in-with-password";
import { Scope } from "@/shared/lib";
import { EnvProviders, SupabaseClientProviders, APIClientProviders, DebugProvider, SessionProvider } from "../providers";
import { SignOutProvider } from "@/features/session/sign-out";

export const clientScope = new Scope(undefined, [
  ...EnvProviders,
  ...SupabaseClientProviders,
  ...APIClientProviders,

  DebugProvider,
  SessionProvider,
  SignInWithPasswordProvider,
  SignOutProvider
]);

await clientScope.resolveAll();
