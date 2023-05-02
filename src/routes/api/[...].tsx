// eslint-disable-next-line boundaries/element-types
import { apiRouter } from "@/app/server";
import { API_URL } from "@/shared/config";
import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { APIEvent } from "solid-start";

const handler = (event: APIEvent) =>
  fetchRequestHandler({
    endpoint: API_URL,
    req: event.request,
    router: apiRouter,
    createContext: () => ({
      supabase: event.locals.supabase as SupabaseClient,
      user: event.locals.user as AuthUser | undefined,
    }),
  });

export const GET = handler;
export const POST = handler;
