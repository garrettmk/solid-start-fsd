import { User } from "@/entities/user";
import { UserProfile } from "@/entities/user-profile";
import { resourceReturnSchema } from "@/shared/schemas";
import { useContainer } from "@/shared/ui";
import { AuthSession } from "@supabase/supabase-js";
import { Accessor, ResourceReturn } from "solid-js";
import { dependency } from "tidi";
import { z } from "zod";
import { Session, sessionSchema } from "../schemas";


/**
 * A Dependency that provides a Session or undefined
 */
export const SessionDependency = dependency<Accessor<Session | undefined>>({
  name: 'SESSION',
  validate: value => z.function().parse(value)
});

/**
 * Returns the Session from the local Scope.
 * 
 * @returns a Session or undefined
 */
export function useSession() {
  return useContainer(SessionDependency);
}

/**
 * A Dependency that provides a boolean indicating whether the user is signed in
 */
export const IsSignedInDependency = dependency<Accessor<boolean>>({
  name: 'IS_SIGNED_IN',
  validate: value => z.function().parse(value)
});

/**
 * Returns a boolean indicating whether the user is signed in from the local Scope.
 */
export function useIsSignedIn() {
  return useContainer(IsSignedInDependency);
}

/**
 * Returns true if the session has expired
 * 
 * @param session 
 * @returns 
 */
export function isExpired(session: Session) {
  return (session.expiresAt * 1000) < Date.now();
}


/**
 * Derive a Session from an AuthSession and validate the result
 * 
 * @param authSession 
 * @returns 
 */
export function toSession(authSession: AuthSession): Session {
  return sessionSchema.parse({
    userId: authSession.user.id,
    role: authSession.user.role,
    expiresAt: authSession.expires_at,
  });
}


/**
 * A Dependency that provides a UserProfile for the current user
 */
export const SessionProfileDependency = dependency<ResourceReturn<UserProfile | undefined>>({
  name: 'SESSION_PROFILE',
  validate: value => resourceReturnSchema.parse(value)
});


/**
 * Returns the UserProfile for the current user from the local Scope.
 * 
 * @returns 
 */
export function useSessionProfile() {
  return useContainer(SessionProfileDependency);
}


/**
 * A Dependency that provides a User for the current session
 */
export const SessionUserDependency = dependency<ResourceReturn<User | undefined>>({
  name: 'SESSION_USER',
  validate: value => resourceReturnSchema.parse(value)
});


/**
 * Returns the User for the current session
 * @returns 
 */
export function useSessionUser() {
  return useContainer(SessionUserDependency);
}
