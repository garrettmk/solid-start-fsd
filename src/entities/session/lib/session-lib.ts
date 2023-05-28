import { dependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";
import { Accessor } from "solid-js";
import { sessionSchema, Session } from "../schemas";
import { AuthSession } from "@supabase/supabase-js";
import { z } from "zod";


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

