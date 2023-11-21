import { SupabaseAnonKeyProvider, SupabaseURLProvider } from "@/app/providers";
import {
  SupabaseAnonKeyDependency,
  SupabaseDependency,
  SupabaseURLDependency,
  createSupabaseClient,
  getEnv
} from "@/shared/lib";
import { SupabaseServiceRoleDependency, SupabaseServiceRoleKeyDependency } from "@/shared/server";
import { provider } from "tidi";

export const SupabaseProvider = provider({
  provides: SupabaseDependency,
  requires: [SupabaseURLDependency, SupabaseAnonKeyDependency],
  use: createSupabaseClient
});

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
  SupabaseURLProvider,
  SupabaseAnonKeyProvider,
  SupabaseProvider,
  SupabaseServiceRoleKeyProvider,
  SupabaseServiceRoleProvider
];