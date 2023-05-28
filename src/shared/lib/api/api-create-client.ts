import type { APIRouter } from "@/shared/server";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";


export function createAPIClient(url: string) {
  return createTRPCProxyClient<APIRouter>({
    links: [
      loggerLink(),
      httpBatchLink({ url }),
    ],
  });
}

export type APIClient = ReturnType<typeof createAPIClient>;
