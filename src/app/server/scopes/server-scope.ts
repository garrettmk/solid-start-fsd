import { Scope } from "tidi";
import { FetchEvent } from "solid-start";

import { APIProviders, AuthProviders, RequestProviders, SupabaseServerProviders } from "../providers";
import { EnvProviders } from "../../providers";


export async function makeServerScope(event: FetchEvent) {
  const scope = new Scope([
    ...EnvProviders,
    ...RequestProviders(event),
    ...SupabaseServerProviders,
    ...AuthProviders,
    ...APIProviders,
  ]);

  await scope.resolveAll();

  return scope;
}