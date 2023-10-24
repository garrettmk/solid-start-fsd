import { DarkModeProvider } from "@/features/appearance/dark-mode";
import { SignInWithPasswordProvider } from "@/features/session/sign-in-with-password";
import { SignOutProvider } from "@/features/session/sign-out";
import { Owner, getOwner } from "solid-js";
import { Container } from "tidi";
import { APIClientProviders, DebugProvider, EnvProviders, IsSignedInProvider, QueryClientProvider, ReactiveContextProvider, SessionProfileProvider, SessionProvider, SessionUserProvider, SupabaseClientProviders } from "../providers";

export function makeClientContainer(owner: Owner | null): Container {
  return new Container([
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
    IsSignedInProvider,
    DarkModeProvider,
    QueryClientProvider,
  ]);
}


export function createClientContainer() {
  const owner = getOwner();
  return makeClientContainer(owner);
}