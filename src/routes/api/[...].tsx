// eslint-disable-next-line boundaries/element-types
import { apiRouter } from "@/app/server";
import { APIURLDependency } from "@/shared/lib";
import { Scope } from "@/shared/lib";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { APIEvent } from "solid-start";

const handler = (event: APIEvent) => {
  const scope = event.locals.scope as Scope;
  const apiUrl = scope.get(APIURLDependency);

  return fetchRequestHandler({
    endpoint: apiUrl,
    req: event.request,
    router: apiRouter,
    createContext: () => ({ scope })
  });
}

export const GET = handler;
export const POST = handler;
