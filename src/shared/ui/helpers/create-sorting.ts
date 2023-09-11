import { Sorting } from "@/shared/schemas";
import { createSignal } from "solid-js";

/**
 * A convenience function for working with a `Sorting` object.
 * 
 * @returns a `Signal` for a `Sorting` object.
 */
export function createSorting(initial: Sorting = []) {
  return createSignal<Sorting>(initial);
}