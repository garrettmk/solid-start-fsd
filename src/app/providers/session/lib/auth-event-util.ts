import { AuthChangeEvent } from "@supabase/supabase-js";

/**
 * Returns true if the event is a sign-in event
 * @param event 
 * @returns 
 */
export function isSignInEvent(event: AuthChangeEvent): boolean {
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