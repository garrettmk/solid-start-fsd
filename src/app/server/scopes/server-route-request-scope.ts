import { Scope } from "@/shared/lib";
import { APIProviders } from "../providers";

export async function makeRouteRequestScope(requestScope: Scope) {
  return requestScope.sub([
    ...APIProviders
  ]);
}