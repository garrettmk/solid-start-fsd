import { supabase } from "@/shared/services";
import { PasswordCredentials } from "../schemas";


export async function signInWithPassword(
  credentials: PasswordCredentials
): Promise<void> {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error)
    throw error;
}
