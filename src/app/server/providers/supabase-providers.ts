import { SupabaseClientProviders } from "@/app/providers";
import {
  SupabaseServiceRoleDependency,
  SupabaseServiceRoleKeyDependency,
  SupabaseURLDependency
} from "@/shared/lib";
import { getEnv, provider } from "@/shared/lib";
import { createSupabaseClient } from "@/shared/lib";

export const SupabaseServiceRoleKeyProvider = provider({
  provides: SupabaseServiceRoleKeyDependency,
  use: () => getEnv('SUPABASE_SERVICE_ROLE_KEY')
});

export const SupabaseServiceRoleProvider = provider({
  provides: SupabaseServiceRoleDependency,
  requires: [SupabaseURLDependency, SupabaseServiceRoleKeyDependency],
  use: createSupabaseClient
});


export const SupabaseServerProviders = [
  ...SupabaseClientProviders,
  SupabaseServiceRoleKeyProvider,
  // SupabaseServiceRoleProvider
];