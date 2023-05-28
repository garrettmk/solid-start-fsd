import { FetchEvent } from "solid-start";
import { AuthProviders, RequestProviders, SupabaseServerProviders } from "../providers";
import { serverEnvScope } from "./server-env-scope";

export function makeRequestScope(event: FetchEvent) {
    return serverEnvScope.sub([
        ...RequestProviders(event),
        ...SupabaseServerProviders,
        ...AuthProviders,
    ]);
}