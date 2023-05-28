import { SupabaseDependency } from "@/shared/lib";
import { dependency, getAuthTokensFromRequest, provider, useAuthTokens } from "@/shared/lib";
import { AuthTokens, authTokensSchema } from "@/shared/schemas";
import { AuthUser } from "@supabase/supabase-js";
import { z } from "zod";
import { RequestDependency } from "./request-providers";

export const AuthTokensDependency = dependency<AuthTokens | undefined>({
  name: 'AUTH_TOKENS',
  validate: (value: unknown) => value === undefined || authTokensSchema.parse(value)
});


export const AuthTokensProvider = provider({
  provides: AuthTokensDependency,
  requires: [RequestDependency],
  use: (req: Request) => getAuthTokensFromRequest(req),
});


export const AuthUserDependency = dependency<AuthUser | undefined>({
  name: 'AUTH_USER',
  validate: (value: unknown) => value === undefined || z.object({}).safeParse(value)
});

export const AuthUserProvider = provider({
  provides: AuthUserDependency,
  requires: [AuthTokensDependency, SupabaseDependency],
  use: async (tokens, supabase) => tokens && useAuthTokens(supabase, tokens)
});


export const AuthProviders = [AuthTokensProvider, AuthUserProvider];