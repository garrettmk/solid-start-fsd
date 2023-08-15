import { dependency } from "tidi";
import type { APICaller } from "../api";


export const APICallerDependency = dependency<APICaller>({
  name: 'API_CALLER',
  validate: (value: unknown) => Boolean(value)
});