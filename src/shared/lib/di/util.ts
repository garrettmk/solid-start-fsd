import { Dependency, DependencyType, Provider, provider } from "./types";
import { getEnv, identity } from "../util";

export function EnvProvider<D extends Dependency>(provides: D, key: string, use: (value: string | undefined) => DependencyType<D> = identity as any): Provider<D> {
  return provider({
    provides,
    use: () => use(getEnv(key))
  });
}