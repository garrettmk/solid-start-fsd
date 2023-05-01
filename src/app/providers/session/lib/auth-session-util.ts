import { AuthSession, AuthResponse } from "@supabase/supabase-js";
import { AuthTokens, authTokensSchema } from "@/shared/schemas";
import { Session, sessionSchema } from "@/entities/session";

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
 * Derive a Session from an AuthSession and validate the result
 * 
 * @param authSession 
 * @returns 
 */
export function toSession(authSession: AuthSession): Session {
  return sessionSchema.parse({
    expiresAt: authSession.expires_at,
    user: {
      id: authSession.user.id,
      role: authSession.user.role,
      email: authSession.user.email,
    },
  });
}

/**
 * Derive AuthTokens from an AuthSession and validate the result
 * @param authSession 
 * @returns 
 */
export function toAuthTokens(authSession: AuthSession): AuthTokens {
  return authTokensSchema.parse({
    accessToken: authSession.access_token,
    refreshToken: authSession.refresh_token,
  });
}