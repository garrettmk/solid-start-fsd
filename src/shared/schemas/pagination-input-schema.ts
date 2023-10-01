import { z } from "zod";

/**
 * Zod validation schema for `Pagination` objects. `Pagination` is used
 * to specify the offset and count of a paginated request.
 */
export const paginationInputSchema = z.object({
  offset: z.number().int().min(0),
  limit: z.number().int().min(1)
});

/**
 * Type of `Pagination` objects.
 */
export type PaginationInput = z.infer<typeof paginationInputSchema>;

/**
 * A default `Pagination` object.
 */
export const defaultPaginationInput: Readonly<PaginationInput> = Object.freeze({
  offset: 0,
  limit: 10
});

