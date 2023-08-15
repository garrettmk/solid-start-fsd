import { Dependency, Scope } from "tidi";
import { JSX, createContext, useContext } from "solid-js";

export const ScopeContext = createContext<Scope>();

export function useScopeContext() {
  const scope = useContext(ScopeContext);

  if (!scope)
    throw new Error("No scope found");

  return scope;
}

export function useContainer<T>(dependency: Dependency<T>): T {
  const scope = useScopeContext();
  return scope.get(dependency);
}

export interface ScopeProviderProps {
  scope: Scope;
  children?: JSX.Element;
}

export function ScopeProvider(props: ScopeProviderProps) {
  return (
    <ScopeContext.Provider value={props.scope}>
      {props.children}
    </ScopeContext.Provider>
  );
}