import type { APIRouter } from "@/shared/server";
import { API_URL } from "../config";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";


export function createAPIClient() {
  return createTRPCProxyClient<APIRouter>({
    links: [
      loggerLink(),
      httpBatchLink({
        url: `http://localhost:3000${API_URL}`,
      }),
    ],
  });
}

export type APIClient = ReturnType<typeof createAPIClient>;
