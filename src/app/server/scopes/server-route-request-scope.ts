import { Scope } from "tidi";
import { APIProviders } from "../providers";

export async function makeRouteRequestScope(requestScope: Scope) {
  return new Scope(requestScope, APIProviders)
}