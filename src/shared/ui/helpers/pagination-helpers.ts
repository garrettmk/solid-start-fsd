import { PaginatedResult, PaginationInput, defaultPaginatedResult, defaultPaginationInput, paginationInputSchema } from "@/shared/schemas";
import { createSignal } from "solid-js";

/**
 * A convenience function for creating a `PaginatedResult` object.
 * 
 * @param initial 
 * @returns 
 */
export function createPaginatedResult(initial?: Partial<PaginatedResult>) {
  return createSignal<PaginatedResult>({
    ...defaultPaginatedResult,
    ...initial
  });
}


/**
 * A convenience function for creating a `PaginationInput` object.
 * 
 * @param initial 
 * @returns 
 */
export function createPaginationInput(initial?: Partial<PaginationInput>) {
  return createSignal<PaginationInput>(paginationInputSchema.parse({
    ...defaultPaginationInput,
    ...initial,
  }));
}
