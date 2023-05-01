/**
 * A function that does nothing
 *
 * @param args anything
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function noop(...args: any[]) { null; }

/**
 * A function that returns the value passed in
 *
 * @param value anything
 * @returns the value passed in
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Casts the input to a boolean
 *
 * @param value anything
 * @returns `true` or `false` depending on whether the value is truthy or falsy
 */
export function isTruthy(value: unknown): boolean {
  return !!value;
}

/**
 * Casts the input to a boolean and inverts it.
 *
 * @param value anything
 * @returns `true` if the input is falsy, `false` otherwise
 */
export function isFalsy(value: unknown): boolean {
  return !value;
}

/**
 * Options for the `clamp` function
 */
export type ClampOptions = {
  min?: number;
  max?: number;
};

/**
 * Restricts a number to a range defined by `options`
 *
 * @param value a number
 * @param options the minimum and maximum values to clamp the number to
 * @returns A number in the range defined by `options`
 */
export function clamp(value: number, options: ClampOptions) {
  const { min, max } = options;

  if (min !== undefined) value = Math.max(min, value);

  if (max !== undefined) value = Math.min(max, value);

  return value;
}

/**
 * An asynchronous delay function
 *
 * @param ms the number of milliseconds to delay
 * @returns a Promise that resolves after `ms` milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
