import { FetchEvent } from "solid-start";
import { AuthProviders, RequestProviders, SupabaseServerProviders } from "../providers";
import { serverEnvContainer } from "./server-env-container";
import { Container } from "tidi";

export function makeRequestContainer(event: FetchEvent) {
    return new Container(serverEnvContainer, [
        ...RequestProviders(event),
        ...SupabaseServerProviders,
        ...AuthProviders,
    ]);
}