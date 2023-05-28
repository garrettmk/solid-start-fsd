import { Session, SessionDependency, toSession } from "@/entities/session";
import { IsClientDependency, SupabaseDependency } from "@/shared/lib";
import {
  AuthTokens,
  getAuthSession,
  getAuthTokensFromStorage,
  isSignInEvent,
  isSignOutEvent, provider, removeAuthTokensFromStorage,
  saveAuthTokensInStorage,
  storageHasAuthTokens,
  toAuthTokens,
  toPartialAuthSession
} from "@/shared/lib";
import { AuthSession } from "@supabase/supabase-js";
import { createSignal } from "solid-js";


export const SessionProvider = provider({
  provides: SessionDependency,
  requires: [SupabaseDependency, IsClientDependency],
  use: (supabase, isClient) => {
    const [session, setSession] = createSignal<Session | undefined>(undefined);

    // On sign-in, derive the session from the auth session and save the auth tokens in storage.
    const handleSignIn = (authSession: AuthSession) => {
      const session = toSession(authSession);
      const tokens = toAuthTokens(authSession);

      setSession(session);
      saveAuthTokensInStorage(tokens);
    };

    // On sign-out, clear the session and remove the auth tokens from storage.
    const handleSignOut = () => {
      setSession(undefined);
      removeAuthTokensFromStorage();
    };

    // Sign in using tokens from storage.
    const handleSignInWithTokens = async (tokens: AuthTokens) => {
      const partialAuthSession = toPartialAuthSession(tokens);
      const response = await supabase.auth.setSession(partialAuthSession);
      const authSession = getAuthSession(response);
      const session = toSession(authSession);
      setSession(session);
    };

    // On mount, set up the auth state change listener and sign in with tokens from storage if they exist.
    if (isClient) {
      supabase.auth.onAuthStateChange(async (event, authSession) => {
        console.log('auth state change', event, authSession);
        if (isSignInEvent(event) && authSession) handleSignIn(authSession);
        else if (isSignOutEvent(event) || !authSession) handleSignOut();
      });

      if (storageHasAuthTokens()) {
        const tokens = getAuthTokensFromStorage();
        handleSignInWithTokens(tokens);
      }
    }

    return session;
  }
})