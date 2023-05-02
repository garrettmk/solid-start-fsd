import { IS_CLIENT, IS_DEV } from "@/shared/config";
import { createSupabaseClient } from "./lib";

export const supabase = createSupabaseClient();

if (IS_DEV && IS_CLIENT)
  // @ts-expect-error non-standard
  window.supabase = supabase;