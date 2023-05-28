import { Scope } from "@/shared/lib";
import { FetchEvent } from "solid-start";

import { APIProviders, AuthProviders, RequestProviders, SupabaseServerProviders } from "../providers";
import { EnvProviders } from "../../providers";


export async function makeServerScope(event: FetchEvent) {
  const scope = new Scope(undefined, [
    ...EnvProviders,
    ...RequestProviders(event),
    ...SupabaseServerProviders,
    ...AuthProviders,
    ...APIProviders,
  ]);

  await scope.resolveAll();

  return scope;
}