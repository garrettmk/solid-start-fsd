import { IsSignedInDependency, Session, SessionDependency, SessionProfileDependency, SessionUserDependency, isExpired, toSession } from "@/entities/session";
import { User } from "@/entities/user";
import {
  APIClientDependency, AuthTokens, IsClientDependency, SupabaseDependency, camelizeObject,
  getAuthTokensFromStorage,
  isSignInOrRefreshEvent,
  isSignOutEvent,
  pick, removeAuthTokensFromStorage,
  saveAuthTokensInStorage,
  storageHasAuthTokens,
  toAuthTokens,
  toPartialAuthSession,
  toRenewalTimeout
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
    const handleSignInOrRefresh = (authSession: AuthSession) => {
      const session = toSession(authSession);
      const tokens = toAuthTokens(authSession);
      const timeout = toRenewalTimeout(authSession);

      setSession(session);
      saveAuthTokensInStorage(tokens);
      setRenewalTimeout(timeout);
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

      if (response.error) {
        console.log(response.error);
        await supabase.auth.signOut();
      }
    };

    // Set a timeout to renew the session automatically
    const setRenewalTimeout = (timeout: number) => {
      setTimeout(() => supabase.auth.refreshSession(), timeout);
    }

    // On mount, set up the auth state change listener and sign in with tokens from storage if they exist.
    if (isClient) {
      supabase.auth.onAuthStateChange(async (event, authSession) => {
        if (isSignInOrRefreshEvent(event) && authSession)
          handleSignInOrRefresh(authSession);
        else if (isSignOutEvent(event) || !authSession)
          handleSignOut();
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
 * Provides a boolean indicating whether the user is signed in.
 */
export const IsSignedInProvider = provider({
  provides: IsSignedInDependency,
  requires: [SessionDependency, ReactiveContextDependency],
  use: (session) => () => {
    const currentSession = session();
    return Boolean(currentSession && !isExpired(currentSession));
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