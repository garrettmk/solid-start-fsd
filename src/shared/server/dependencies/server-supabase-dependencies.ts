import { dependency } from "@/shared/lib";
import { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

export const SupabaseServiceRoleDependency = dependency<SupabaseClient>({
  name: 'SUPABASE_SERVICE_ROLE',
  validate: (value: unknown) => z.instanceof(SupabaseClient).parse(value)
})
