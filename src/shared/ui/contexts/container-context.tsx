import { Dependency, Container } from "tidi";
import { JSX, createContext, useContext } from "solid-js";

export const ContainerContext = createContext<Container>();

export function useContainerContext() {
  const container = useContext(ContainerContext);

  if (!container)
    throw new Error("No Container found");

  return container;
}

export function useContainer<T>(dependency: Dependency<T>): T {
  const container = useContainerContext();
  return container.get(dependency);
}

export interface ContainerProviderProps {
  container: Container;
  children?: JSX.Element;
}

export function ContainerProvider(props: ContainerProviderProps) {
  return (
    <ContainerContext.Provider value={props.container}>
      {props.children}
    </ContainerContext.Provider>
  );
}