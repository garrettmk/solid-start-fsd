import { SignInWithPasswordProvider } from "@/features/session/sign-in-with-password";
import { Scope } from "@/shared/lib";
import { EnvProviders, SupabaseClientProviders, APIClientProviders, DebugProvider, SessionProvider } from "../providers";
import { SignOutProvider } from "@/features/session/sign-out";
import { DarkModeProvider } from "@/features/appearance/dark-mode";

export const clientScope = new Scope(undefined, [
  ...EnvProviders,
  ...SupabaseClientProviders,
  ...APIClientProviders,

  DebugProvider,
  SessionProvider,
  SignInWithPasswordProvider,
  SignOutProvider,
  DarkModeProvider,
]);

await clientScope.resolveAll();
