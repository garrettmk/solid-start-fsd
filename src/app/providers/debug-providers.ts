import { IsClientDependency, IsDevDependency } from "@/shared/lib";
import { ScopeDependency, dependency, provider } from "tidi";
import { IsSignedInDependency, SessionDependency } from "@/entities/session";

export const DebugDependency = dependency<void>({
  name: 'DEBUG',
});

export const DebugProvider = provider({
  provides: DebugDependency,
  requires: [IsDevDependency, IsClientDependency, ScopeDependency, SessionDependency, IsSignedInDependency],
  use: (isDev, isClient, scope, session, isSignedIn) => {
    if (isDev && isClient)
      Object.assign(window, {
        scope,
        session,
        isSignedIn,
        SessionDependency,
        IsSignedInDependency
      });
  }
})