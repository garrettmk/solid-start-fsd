import { SupabaseClient, User as AuthUser } from "@supabase/supabase-js";
import { snakeifyObject } from "@/shared/lib";
import { AuthTokens } from "@/shared/schemas";

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