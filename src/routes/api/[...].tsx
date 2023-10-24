// eslint-disable-next-line boundaries/element-types
import { apiRouter } from "@/app/server";
import { APIURLDependency } from "@/shared/lib";
import { Container } from "tidi";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { APIEvent } from "solid-start";

const handler = (event: APIEvent) => {
  const container = event.locals.container as Container;
  const apiUrl = container.get(APIURLDependency);

  return fetchRequestHandler({
    endpoint: apiUrl,
    req: event.request,
    router: apiRouter,
    createContext: () => ({ container })
  });
}

export const GET = handler;
export const POST = handler;
