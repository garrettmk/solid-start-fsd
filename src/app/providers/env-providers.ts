import { AppURLDependency, IsDevDependency, SignInURLDependency } from "@/shared/lib";
import { IsStagingDependency } from "@/shared/lib";
import { AppMode } from "@/shared/lib";
import { AppModeDependency } from "@/shared/lib";
import { IsProductionDependency } from "@/shared/lib";
import { IsServerDependency, IsClientDependency } from "@/shared/lib";
import { getEnv, provider } from "@/shared/lib";

export const IsServerProvider = provider({
  provides: IsServerDependency,
  use: () => !!getEnv('SSR')
});

export const IsClientProvider = provider({
  provides: IsClientDependency,
  use: () => !getEnv('SSR')
});

export const AppModeProvider = provider({
  provides: AppModeDependency,
  use: () => getEnv('MODE') as AppMode
});

export const IsDevProvider = provider({
  provides: IsDevDependency,
  requires: [AppModeDependency],
  use: (appMode) => appMode === AppMode.Development
});

export const IsProductionProvider = provider({
  provides: IsProductionDependency,
  requires: [AppModeDependency],
  use: (appMode) => appMode === AppMode.Production
});

export const IsStagingProvider = provider({
  provides: IsStagingDependency,
  requires: [AppModeDependency],
  use: appMode => appMode === AppMode.Staging
});

export const IsTestProvider = provider({
  provides: IsStagingDependency,
  requires: [AppModeDependency],
  use: appMode => appMode === AppMode.Test
});

export const AppURLProvider = provider({
  provides: AppURLDependency,
  use: () => getEnv('VITE_APP_URL') as string
});

export const SignInURLProvider = provider({
  provides: SignInURLDependency,
  use: () => getEnv('VITE_SIGN_IN_URL') as string
});

export const EnvProviders = [
  IsServerProvider,
  IsClientProvider,
  AppModeProvider,
  IsDevProvider,
  IsProductionProvider,
  IsStagingProvider,
  IsTestProvider,
  AppURLProvider,
  SignInURLProvider,
];