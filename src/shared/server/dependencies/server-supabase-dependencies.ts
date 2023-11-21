import { dependency } from "tidi";
import { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";


export const SupabaseServiceRoleKeyDependency = dependency<string>({
  name: 'SUPABASE_SERVICE_ROLE_KEY',
  validate: (value: unknown) => z.string().min(1).parse(value)
});

export const SupabaseServiceRoleDependency = dependency<SupabaseClient>({
  name: 'SUPABASE_SERVICE_ROLE',
  validate: (value: unknown) => z.instanceof(SupabaseClient).parse(value)
})
