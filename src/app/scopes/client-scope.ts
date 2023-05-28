import { SignInWithPasswordProvider } from "@/features/session/sign-in-with-password";
import { Scope } from "@/shared/lib";
import { EnvProviders, SupabaseClientProviders, APIClientProviders, DebugProvider, SessionProvider } from "../providers";

export const clientScope = new Scope(undefined, [
  ...EnvProviders,
  ...SupabaseClientProviders,
  ...APIClientProviders,

  DebugProvider,
  SessionProvider,
  SignInWithPasswordProvider
]);

await clientScope.resolveAll();
