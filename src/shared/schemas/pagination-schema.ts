import { z } from "zod";

/**
 * Zod validation schema for `Pagination` objects. `Pagination` is used
 * to specify the offset and count of a paginated request.
 */
export const paginationSchema = z.object({
  offset: z.number().int().min(0),
  count: z.number().int().min(1)
});

/**
 * Type of `Pagination` objects.
 */
export type Pagination = z.infer<typeof paginationSchema>;

/**
 * Zod validation schema for `Paginated` objects. `Paginated` is used
 * to specify the offset, count, and total of a paginated response.
 */
export const paginatedSchema = z.object({
  offset: z.number().int().min(0),
  count: z.number().int().min(0),
  total: z.number().int().min(0)
});

/**
 * Type of `Paginated` objects.
 */
export type Paginated = z.infer<typeof paginatedSchema>;