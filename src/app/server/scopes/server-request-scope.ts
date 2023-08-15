import { FetchEvent } from "solid-start";
import { AuthProviders, RequestProviders, SupabaseServerProviders } from "../providers";
import { serverEnvScope } from "./server-env-scope";
import { Scope } from "tidi";

export function makeRequestScope(event: FetchEvent) {
    return new Scope(serverEnvScope, [
        ...RequestProviders(event),
        ...SupabaseServerProviders,
        ...AuthProviders,
    ]);
}