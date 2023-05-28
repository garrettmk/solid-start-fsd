import {
  mapKeys,
  camel,
  isArray,
  isObject,
  chain,
  snake,
  mapEntries,
} from "radash";

/**
 * Return a new object with all falsy values removed
 * @param obj
 * @returns
 */
export function shakeFalsyValues<T = object>(obj: object): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => !value)
  ) as T;
}

export function shakeNullValues<T = object>(obj: object): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== null)
  ) as T;
}

/**
 * Return a new object with all keys camelized
 * @param obj
 * @returns
 */
export function camelizeObject<T = object>(obj: object): T {
  return mapKeys(obj, (key) => camel(key)) as T;
}

/**
 * Return a new object with all keys snake_cased
 * @param obj
 * @returns
 */
export function snakeifyObject<T = object>(obj: object): T {
  return mapKeys(obj, (key) => snake(key)) as T;
}

/**
 * Recursively applies the given processors to the given value. If the value
 * is an array, the processors are applied to each element. If the value is
 * an object, the processors are applied to each entry and then the object itself.
 *
 * @param processors
 * @returns
 */
export function recursively<T = object>(
  ...processors: ((v: object) => unknown)[]
): (value: unknown) => T {
  // Declare the function as a const so that it can be called recursively
  const self: (value: unknown) => T = (value: unknown) => {
    if (isArray(value)) return value.map((v) => self(v)) as T;

    if (isObject(value)) {
      const withProcessedEntries = mapEntries(value, (key, val) => [
        key,
        self(val),
      ]);
      return chain(...processors)(withProcessedEntries) as T;
    }

    return value as T;
  };

  return self;
}
