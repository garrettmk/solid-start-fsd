import { provider } from "tidi";
import { ReactiveContextDependency } from "@/shared/ui";
import { Owner } from "solid-js";


export function ReactiveContextProvider(owner: Owner | null) {
  return provider({
    provides: ReactiveContextDependency,
    use: () => owner,
  });
}