import { dependency } from "../di";
import { z } from "zod";
import { APIClient } from "./api-create-client";

export const APIURLDependency = dependency<string>({
  name: 'API_URL',
  validate: (value: unknown) => z.string().min(1).parse(value)
});

export const APIClientDependency = dependency<APIClient>({
  name: 'API',
  validate: (value: unknown) => Boolean(value)
});
