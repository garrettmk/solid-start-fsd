import { IS_CLIENT } from "@/shared/config";
import { createSupabaseClient } from "./lib";

export const supabase = createSupabaseClient();

if (IS_CLIENT)
  // @ts-expect-error non-standard
  window.supabase = supabase;