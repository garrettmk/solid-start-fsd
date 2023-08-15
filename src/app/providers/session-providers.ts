import { Session, SessionDependency, SessionProfileDependency, SessionUserDependency, toSession } from "@/entities/session";
import { User } from "@/entities/user";
import {
  APIClientDependency, AuthTokens, IsClientDependency, SupabaseDependency, camelizeObject, getAuthSession,
  getAuthTokensFromStorage,
  isSignInEvent,
  isSignOutEvent, pick, removeAuthTokensFromStorage,
  saveAuthTokensInStorage,
  storageHasAuthTokens,
  toAuthTokens,
  toPartialAuthSession
} from "@/shared/lib";
import { ReactiveContextDependency, runWithOwner } from "@/shared/ui";
import { AuthSession } from "@supabase/supabase-js";
import { createResource, createSignal } from "solid-js";
import { provider } from "tidi";

/**
 * Provides a Session for the current user, or undefined.
 */
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
});

/**
 * Provides a UserProfile for the current user, or undefined.
 */
export const SessionProfileProvider = provider({
  provides: SessionProfileDependency,
  requires: [SessionDependency, APIClientDependency, ReactiveContextDependency],
  use: async (session, api, owner) => 
    runWithOwner(owner, () => 
      createResource(
        () => session()?.userId, 
        async (userId) => {
          if (userId) 
            return api.userProfiles.viewProfile.query(userId)
        }
      )
    )
});

/**
 * Provides a User for the current session, or undefined
 */

export const SessionUserProvider = provider({
  provides: SessionUserDependency,
  requires: [SessionDependency, SupabaseDependency, ReactiveContextDependency],
  use: async (session, supabase, owner) =>
    runWithOwner(owner, () =>
      createResource(session, async () => {
          const user = (await supabase.auth.getSession()).data.session?.user;

          return user && camelizeObject(pick(user, [
            'id',
            'email',
            'created_at'
          ])) as User;
        }
      )
    )
});