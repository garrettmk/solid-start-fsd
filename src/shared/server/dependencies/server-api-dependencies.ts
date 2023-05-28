import { dependency } from "@/shared/lib";
import type { APICaller } from "../api";
import { z } from "zod";


export const APICallerDependency = dependency<APICaller>({
  name: 'API_CALLER',
  validate: (value: unknown) => Boolean(value)
});