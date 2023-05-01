import { supabase } from "@/shared/services";
import { createResource, createSignal } from "solid-js";
import { PasswordCredentials } from "../schemas";


export async function signInWithPassword(
  credentials: PasswordCredentials
): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword(credentials);
  if (error)
    throw error;
}


export function useSignInWithPassword() {
  const [variables, setVariables] = createSignal<PasswordCredentials>();
  const [result] = createResource(variables, signInWithPassword);

  return [result, setVariables] as const;
}