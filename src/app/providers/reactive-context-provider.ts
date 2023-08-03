import { provider } from "@/shared/lib";
import { ReactiveContextDependency } from "@/shared/ui";
import { Owner } from "solid-js";


export function ReactiveContextProvider(owner: Owner | null) {
  return provider({
    provides: ReactiveContextDependency,
    use: () => owner,
  });
}