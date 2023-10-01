import { z } from "zod";
import { defaultPaginationInput } from "./pagination-input-schema";

/**
 * Zod validation schema for `PaginatedResult` objects. `PaginatedResult` is used
 * to specify the offset, count, and total of a paginated response.
 */
export const paginatedResultSchema = z.object({
  offset: z.number().int().min(0),
  limit: z.number().int().min(0),
  total: z.number().int().min(0)
});

/**
 * Type of `Paginated` objects.
 */
export type PaginatedResult = z.infer<typeof paginatedResultSchema>;


/**
 * A default `PaginatedResult` object.
 */
export const defaultPaginatedResult: PaginatedResult = Object.freeze({
  ...defaultPaginationInput,
  total: 0
});