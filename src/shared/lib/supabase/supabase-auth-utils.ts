import { AuthChangeEvent, SupabaseClient } from "@supabase/supabase-js";
import { AuthSession, AuthResponse, AuthUser } from "@supabase/supabase-js";
import { AuthTokens, authTokensSchema } from "@/shared/schemas";
import { snakeifyObject } from "../util";


/**
 * Returns true if the event is a sign-in event
 * @param event 
 * @returns 
 */
export function isSignInOrRefreshEvent(event: AuthChangeEvent): boolean {
  return event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED';
}


/**
 * Returns true if the event is a sign-out event
 * @param event 
 * @returns 
 */
export function isSignOutEvent(event: AuthChangeEvent): boolean {
  return event === 'SIGNED_OUT';
}


/**
 * Derive an AuthSession from an AuthResponse, or throw an error if no session is found
 * 
 * @param response 
 * @returns 
 */
export function getAuthSession(response: AuthResponse): AuthSession {
  const { data, error } = response;
  const { session } = data;

  if (error)
    throw error;
  if (!session)
    throw new Error("No session found");

  return session;
}


/**
 * Derive a partial AuthSession from AuthTokens
 * 
 * @param tokens 
 * @returns a partial AuthSession
 */
export function toPartialAuthSession(tokens: AuthTokens): Pick<AuthSession, "access_token" | "refresh_token"> {
  return {
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
  };
}


/**
 * Derive AuthTokens from an AuthSession and validate the result
 * 
 * @param authSession 
 * @returns 
 */
export function toAuthTokens(authSession: AuthSession): AuthTokens {
  return authTokensSchema.parse({
    accessToken: authSession.access_token,
    refreshToken: authSession.refresh_token,
  });
}


/**
 * Try to set the session of a SupabaseClient using AuthTokens. Returns the user associated
 * with the AuthTokens, or undefined if no user is found.
 * 
 * @param supabase a SupabaseClient
 * @param tokens a set of AuthTokens
 * @returns the user associated with the AuthTokens, or undefined if no user is found
 */
export async function useAuthTokens(
  supabase: SupabaseClient,
  tokens: AuthTokens
): Promise<AuthUser | undefined> {
  const { data, error } = await supabase.auth.setSession(
    snakeifyObject(tokens)
  );

  if (error) console.log(error);

  return data.user ?? undefined;
}


/**
 * Returns the number of milliseconds until the token should be renewed.
 * 
 * @param authSession 
 * @returns 
 */
export function toRenewalTimeout(authSession: AuthSession): number {
  return Math.min((authSession.expires_in - 60) * 1000, 10_000);
}