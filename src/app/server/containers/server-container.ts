import { Container } from "tidi";
import { FetchEvent } from "solid-start";

import { APIProviders, AuthProviders, RequestProviders, SupabaseServerProviders } from "../providers";
import { EnvProviders } from "../../providers";


export async function makeServerContainer(event: FetchEvent) {
  const container = new Container([
    ...EnvProviders,
    ...RequestProviders(event),
    ...SupabaseServerProviders,
    ...AuthProviders,
    ...APIProviders,
  ]);

  await container.resolveAll();

  return container;
}