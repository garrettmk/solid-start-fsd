import { dependency, provider } from "@/shared/lib";
import { FetchEvent } from "solid-start";
import { z } from "zod";


export const FetchEventDependency = dependency<FetchEvent>({
  name: 'FETCH_EVENT',
  validate: (value: unknown) => z.object({
    request: z.instanceof(Request),
    clientAddress: z.string().url().or(z.string().ip()),
    locals: z.record(z.any()),
  }).parse(value)
});

export const FetchEventProvider = (event: FetchEvent) => provider({
  provides: FetchEventDependency,
  use: () => event
});


export const RequestDependency = dependency<Request>({
  name: 'REQUEST',
  validate: (value: unknown) => z.instanceof(Request).parse(value)
});

export const RequestProvider = provider({
  provides: RequestDependency,
  requires: [FetchEventDependency],
  use: event => event.request
});


export const RequestURLDependency = dependency<URL>({
  name: 'REQUEST_URL',
  validate: (value: unknown) => z.instanceof(URL).parse(value)
});

export const RequestURLProvider = provider({
  provides: RequestURLDependency,
  requires: [RequestDependency],
  use: request => new URL(request.url)
});


export const RequestProviders = (event: FetchEvent) => [
  FetchEventProvider(event),
  RequestProvider,
  RequestURLProvider,
];

