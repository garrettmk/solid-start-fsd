import { DarkModeProvider } from "@/features/appearance/dark-mode";
import { SignInWithPasswordProvider } from "@/features/session/sign-in-with-password";
import { SignOutProvider } from "@/features/session/sign-out";
import { Scope } from "@/shared/lib";
import { Owner, getOwner } from "solid-js";
import { APIClientProviders, DebugProvider, EnvProviders, ReactiveContextProvider, SessionProfileProvider, SessionProvider, SupabaseClientProviders } from "../providers";


export function makeClientScope(owner: Owner | null): Scope {
  return new Scope(undefined, [
    ReactiveContextProvider(owner),
    ...EnvProviders,
    ...SupabaseClientProviders,
    ...APIClientProviders,

    DebugProvider,
    SignInWithPasswordProvider,
    SignOutProvider,
    SessionProvider,
    SessionProfileProvider,
    DarkModeProvider,
  ]);
}


export function createClientScope() {
  const owner = getOwner();
  return makeClientScope(owner);
}