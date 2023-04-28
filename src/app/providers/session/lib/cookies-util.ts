import type { CookieSerializeOptions } from "solid-start";
import { serializeCookie } from "solid-start";

/**
 * Parse a string of cookies into a map of key-value pairs
 * 
 * @param cookeString a string of cookies
 * @returns A map of key-value pairs
 */
export function parseCookies(cookeString: string): Map<string, string> {
  return new Map(
    cookeString
      .split(";")
      .map((entryString) => entryString.trim().split("=") as [string, string])
  );
}

export { serializeCookie, CookieSerializeOptions };
