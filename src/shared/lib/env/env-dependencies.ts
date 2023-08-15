import { z } from "zod";
import { dependency } from "tidi";

export const IsServerDependency = dependency<boolean>({
  name: 'IS_SERVER',
  validate: (value: unknown) => z.boolean().safeParse(value).success
});

export const IsClientDependency = dependency<boolean>({
  name: 'IS_CLIENT',
  validate: (value: unknown) => z.boolean().safeParse(value).success
});


export enum AppMode {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
  Test = 'test'
}

export const AppModeDependency = dependency<AppMode>({
  name: 'APP_MODE',
  validate: (value: unknown) => z.enum([
    AppMode.Development,
    AppMode.Production,
    AppMode.Staging
  ]).parse(value)
});

export const IsDevDependency = dependency<boolean>({
  name: 'IS_DEV',
  validate: (value: unknown) => z.boolean().safeParse(value).success
});

export const IsProductionDependency = dependency<boolean>({
  name: 'IS_PRODUCTION',
  validate: (value: unknown) => z.boolean().safeParse(value).success
});

export const IsStagingDependency = dependency<boolean>({
  name: 'IS_STAGING',
  validate: (value: unknown) => z.boolean().safeParse(value).success
});

export const IsTestDependency = dependency<boolean>({
  name: 'IS_TEST',
  validate: (value: unknown) => z.boolean().safeParse(value).success
});

export const AppURLDependency = dependency<string>({
  name: 'APP_URL',
  validate: (value: unknown) => z.string().min(1).parse(value)
});

export const SignInURLDependency = dependency<string>({
  name: 'SIGN_IN_URL',
  validate: (value: unknown) => z.string().min(1).parse(value)
});