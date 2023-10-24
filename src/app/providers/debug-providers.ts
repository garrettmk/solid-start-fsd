import { IsClientDependency, IsDevDependency } from "@/shared/lib";
import { ContainerDependency, dependency, provider } from "tidi";
import { IsSignedInDependency, SessionDependency } from "@/entities/session";

export const DebugDependency = dependency<void>({
  name: 'DEBUG',
});

export const DebugProvider = provider({
  provides: DebugDependency,
  requires: [IsDevDependency, IsClientDependency, ContainerDependency, SessionDependency, IsSignedInDependency],
  use: (isDev, isClient, container, session, isSignedIn) => {
    if (isDev && isClient)
      Object.assign(window, {
        container,
        session,
        isSignedIn,
        SessionDependency,
        IsSignedInDependency
      });
  }
})