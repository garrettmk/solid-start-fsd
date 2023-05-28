
export interface Dependency<T = unknown> {
  readonly name: string;
  readonly validate?: (value: unknown) => unknown;
}

export type DependencyType<D> = D extends Dependency<infer T> ? T : never;

export type DependencyTypes<D extends [...unknown[]]> = D extends [infer Head, ...infer Tail]
  ? [DependencyType<Head>, ...DependencyTypes<Tail>]
  : [];

export type Dependencies<U extends [...unknown[]]> = U extends [infer Head, ...infer Tail]
  ? [Dependency<Head>, ...Dependencies<Tail>]
  : [];


export interface Provider<T extends Dependency = Dependency, D extends [...Dependency[]] = [...Dependency[]]> {
  readonly provides: T
  readonly requires?: [...D];
  readonly use: (...args: DependencyTypes<D>) => DependencyType<T> | Promise<DependencyType<T>>;
}

export function dependency<T>(options: Dependency<T>): Dependency<T> {
  return Object.freeze(options);
}

export function provider<D extends Dependency, U extends [...Dependency[]]>(options: Provider<D, U>): Provider<D, U> {
  return Object.freeze(options);
}
