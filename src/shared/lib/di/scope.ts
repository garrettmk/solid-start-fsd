import { z } from "zod";
import { Dependency, DependencyType, Provider, dependency } from "./types";


export const ScopeDependency = dependency<Scope>({
  name: 'SCOPE',
  validate: (value) => z.instanceof(Scope).parse(value),
});


/**
 * A scope is a container for providers. It can be used to resolve dependencies,
 * and to create sub-scopes with their own providers.
 */
export class Scope {
  protected readonly parent?: Scope;
  protected readonly cache: Map<Dependency, any>;
  protected readonly providers: Map<Dependency, Provider>;


  /**
   * Create a new scope.
   * 
   * @param parent The parent scope
   * @param providers The scope's providers
   */
  constructor(
    parent?: Scope,
    providers: Provider[] = [],
  ) {
    this.parent = parent;
    this.providers = new Map(providers.map((provider) => [provider.provides, provider]));
    this.cache = new Map();
  }


  /**
   * Create a new scope whose parent is this scope.
   * 
   * @param providers The providers to add to the new scope
   * @returns The new scope
   */
  public sub(providers: Provider[] = []): Scope {
    const child = new Scope(this, providers);
    return child;
  }


  /**
   * Return the cached value for a dependency, or throw an error if no value
   * 
   * @param dependency The dependency to get the value for
   * @returns The value
   */
  public get<D extends Dependency>(dependency: D): DependencyType<D> {
    if (dependency === ScopeDependency)
      return this as DependencyType<D>;

    if (this.cache.has(dependency))
      return this.cache.get(dependency);

    if (this.parent)
      return this.parent.get(dependency);

    throw new Error(`No value resolved for dependency ${dependency.name}`);
  }

  /**
   * Get the provider for a dependency, or throw an error if no provider exists
   * 
   * @param dependency 
   * @returns the provider
   */
  public getProvider<D extends Dependency>(dependency: D): Provider<D> {
    if (!this.providers.has(dependency))
      throw new Error(`No provider found for dependency ${dependency.name}`);

    return this.providers.get(dependency) as Provider<D>;
  }


  /**
   * Resolve a dependency or array of dependencies. If the dependency is resolved
   * in this scope (not a parent scope), the resolved value will be cached.
   * 
   * @param dependency 
   * @returns 
   */
  public async resolve(dependencies: Dependency[]): Promise<unknown[]>;
  public async resolve<T>(dependency: Dependency<T>): Promise<T>;
  public async resolve<T>(dependencyOrArray: Dependency<T> | Dependency[]): Promise<T | unknown[]> {
    // If it's an array, resolve them each individually
    if (Array.isArray(dependencyOrArray)) {
      const dependencies = dependencyOrArray;

      return await Promise.all(
        dependencies.map((dependency) => this.resolve(dependency))
      );
    }

    // If it's a single dependency...
    const dependency = dependencyOrArray;

    // If the dependency is the scope itself, return this scope
    if (dependency === ScopeDependency)
      return this as unknown as T;

    // If the dependency is already cached, return the cached value
    if (this.cache.has(dependency))
      return this.cache.get(dependency);

    // If the dependency is provided in this scope, resolve it and cache the value
    if (this.providers.has(dependency)) {
      const provider = this.getProvider(dependency);
      const value = await this.useProvider(provider);

      this.validate(value, dependency);
      this.cache.set(dependency, value);

      return value;
    }

    // If the dependency is not provided in this scope, try to resolve it in the parent scope
    if (this.parent)
      return await this.parent.resolve(dependency);

    throw new Error(`Unable to resolve dependency ${dependency?.name ?? dependency}`);
  }


  /**
   * Clears the cached value for all dependencies, and resolves them again.
   */
  public async resolveAll(): Promise<void> {
    // Clear the cache
    this.cache.clear();

    // Sort the providers by the number of dependencies they require, least to most
    const providers = Array.from(this.providers.values());
    const byRequirementsLength = (a: Provider, b: Provider) => (a.requires?.length ?? 0) - (b.requires?.length ?? 0);
    providers.sort(byRequirementsLength);

    // Resolve each provider, in order
    for (const provider of providers) {
      if (!this.cache.has(provider.provides)) {
        const value = await this.useProvider(provider);
        this.validate(value, provider.provides);
        this.cache.set(provider.provides, value);
      }
    }
  }


  /**
   * Returns true if the dependency is resolved in this scope (not a parent scope).
   * 
   * @param dependency 
   * @returns 
   */
  public isResolved(dependency: Dependency): boolean {
    return this.cache.has(dependency);
  }


  /**
   * Returns true if all providers in this scope have been resolved.
   * 
   * @returns 
   */
  public isAllResolved(): boolean {
    const providers = Array.from(this.providers.values());
    return providers.every((provider) => this.isResolved(provider.provides));
  }

  /**
   * Use the given provider to generate a value.
   * 
   * @param provider 
   * @returns 
   */
  public async useProvider<D extends Dependency>(provider: Provider<D>): Promise<DependencyType<D>> {
    this.checkForCircularDependencies(provider);

    const dependencies = await this.resolve(provider.requires ?? []);
    const value = await provider.use(...dependencies as []);

    return value;
  }


  /**
   * Validate a value against a dependency's validation function. Throws an error
   * if the value fails validation.
   * 
   * @param value The value to validate
   * @param dependency The dependency to validate against
   * @returns 
   */
  public validate(value: unknown, dependency: Dependency): void {
    if (!dependency.validate)
      return;

    let isValid: boolean;
    try {
      isValid = Boolean(dependency.validate(value));
    } catch (cause) {
      throw new Error(`Dependency ${dependency.name} failed validation: ${JSON.stringify(cause)}`, { cause });
    }

    if (!isValid)
      throw new Error(`Dependency ${dependency.name} failed validation`);
  }


  public checkForCircularDependencies(provider: Provider, _start: Provider = provider): void {
    for (const dependency of provider.requires ?? []) {
      if (dependency === ScopeDependency)
        continue;

      const dependencyProvider = this.getProvider(dependency);

      if (dependencyProvider === _start)
        throw new Error(`Provider for ${provider.provides.name} closes a loop with ${dependency.name}`);

      this.checkForCircularDependencies(dependencyProvider, _start);
    }
  }


  /**
   * Get the dependencies that require the given dependency, directly or indirectly.
   * 
   * @param dependency 
   * @returns an array of dependencies
   */
  public getDependents(dependency: Dependency, _start: Dependency = dependency): Dependency[] {
    const providers = Array.from(this.providers.values());

    // Does this dependency close a loop?
    const throwIfClosesLoop = (p: Provider) => {
      if (p.requires?.includes(_start))
        throw new Error(`Provider for ${p.provides.name} closes a loop with ${_start.name}`);

      return p;
    };

    // Does the provider require the dependency?
    const requiresDependency = (p: Provider) => p.requires?.includes(dependency) ?? false;

    // Get the dependencies that require the value provided by the provider
    const getNextDependents = (p: Provider) => this.getDependents(p.provides);

    // Find the providers that require the dependency, and get their dependents
    return providers
      .map(throwIfClosesLoop)
      .filter(requiresDependency)
      .flatMap(getNextDependents);
  }


  /**
   * Clears the cached value for the dependency, and resolves it again.
   * The dependency's dependents will also be invalidated.
   * 
   * @param dependency The dependency to invalidate
   */
  public async invalidate(dependency: Dependency): Promise<void> {
    // If we have a provider for this dependency, clear the cache and resolve it again
    if (this.providers.has(dependency)) {
      this.cache.delete(dependency);
      await this.resolve(dependency);
    }

    // If we have any dependents, invalidate them too
    const dependents = this.getDependents(dependency);
    for (const dependent of dependents)
      await this.invalidate(dependent);
  }

}

