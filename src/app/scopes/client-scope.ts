import { DarkModeProvider } from "@/features/appearance/dark-mode";
import { SignInWithPasswordProvider } from "@/features/session/sign-in-with-password";
import { SignOutProvider } from "@/features/session/sign-out";
import { Scope } from "tidi";
import { Owner, getOwner } from "solid-js";
import { APIClientProviders, DebugProvider, EnvProviders, ReactiveContextProvider, SessionProfileProvider, SessionProvider, SessionUserProvider, SupabaseClientProviders, QueryClientProvider } from "../providers";

export function makeClientScope(owner: Owner | null): Scope {
  return new Scope([
    ReactiveContextProvider(owner),
    ...EnvProviders,
    ...SupabaseClientProviders,
    ...APIClientProviders,

    DebugProvider,
    SignInWithPasswordProvider,
    SignOutProvider,
    SessionProvider,
    SessionProfileProvider,
    SessionUserProvider,
    DarkModeProvider,
    QueryClientProvider,
  ]);
}


export function createClientScope() {
  const owner = getOwner();
  return makeClientScope(owner);
}