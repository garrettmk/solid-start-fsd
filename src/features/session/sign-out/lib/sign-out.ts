import { supabase } from "@/shared/services";

export async function signOut() {
  await supabase.auth.signOut();
}