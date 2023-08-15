import { IsClientDependency, IsDevDependency } from "@/shared/lib";
import { ScopeDependency, dependency, provider } from "tidi";
import { SessionDependency } from "@/entities/session";

export const DebugDependency = dependency<void>({
  name: 'DEBUG',
});

export const DebugProvider = provider({
  provides: DebugDependency,
  requires: [IsDevDependency, IsClientDependency, ScopeDependency, SessionDependency],
  use: (isDev, isClient, scope) => {
    if (isDev && isClient)
      Object.assign(window, {
        scope,
        SessionDependency
      });
  }
})