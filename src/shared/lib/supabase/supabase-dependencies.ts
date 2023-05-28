import { dependency } from "../di";
import { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

export const SupabaseURLDependency = dependency<string>({
  name: 'SUPABASE_URL',
  validate: (value: unknown) => z.string().url().parse(value)
});

export const SupabaseAnonKeyDependency = dependency<string>({
  name: 'SUPABASE_ANON_KEY',
  validate: (value: unknown) => z.string().min(1).parse(value)
});

export const SupabaseServiceRoleKeyDependency = dependency<string>({
  name: 'SUPABASE_SERVICE_ROLE_KEY',
  validate: (value: unknown) => z.string().min(1).parse(value)
});

export const SupabaseDependency = dependency<SupabaseClient>({
  name: 'SUPABASE',
  validate: (value: unknown) => z.instanceof(SupabaseClient).parse(value)
});

export const SupabaseServiceRoleDependency = dependency<SupabaseClient>({
  name: 'SUPABASE_SERVICE_ROLE',
  validate: (value: unknown) => z.instanceof(SupabaseClient).parse(value)
})
