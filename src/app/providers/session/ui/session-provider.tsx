import { Session, SessionContext } from "@/entities/session";
import { IS_CLIENT } from "@/shared/config";
import { supabase } from "@/shared/services";
import { AuthSession } from "@supabase/supabase-js";
import { JSX, createSignal, onMount } from "solid-js";
import {
  getAuthSession,
  getAuthTokensFromStorage,
  isSignInEvent,
  isSignOutEvent,
  removeAuthTokensFromStorage,
  saveAuthTokensInStorage,
  storageHasAuthTokens,
  toAuthTokens,
  toPartialAuthSession,
  toSession,
} from "../lib";
import { AuthTokens } from "@/shared/schemas";

export interface SessionProviderProps {
  children: JSX.Element;
}

/**
 * Provides a Session signal to the application. When the provider component mounts,
 * it checks for auth tokens in storage and signs in with them if they exist. When the
 * Supabase auth state changes, the session is updated accordingly.
 *
 * @param props
 * @returns
 */
export function SessionProvider(props: SessionProviderProps) {
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
  if (IS_CLIENT)
    onMount(async () => {
      supabase.auth.onAuthStateChange(async (event, authSession) => {
        if (isSignInEvent(event) && authSession) handleSignIn(authSession);
        else if (isSignOutEvent(event) || !authSession) handleSignOut();
      });

      if (storageHasAuthTokens()) {
        const tokens = getAuthTokensFromStorage();
        handleSignInWithTokens(tokens);
      }
    });

  return <SessionContext.Provider value={session} children={props.children} />;
}
