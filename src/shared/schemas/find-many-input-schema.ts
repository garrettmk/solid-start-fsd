import { z } from "zod";
import { sortingSchema } from "./sorting-schema";
import { paginationSchema } from "./pagination-schema";

/**
 * A schema for validating a `FindManyInput` object.
 */
export const findManyInputSchema = z.object({
  keywords: z.string().optional(),
  sorting: sortingSchema.optional(),
  pagination: paginationSchema.optional()
});

/**
 * A type for a `FindManyInput` object.
 */
export type FindManyInput = z.input<typeof findManyInputSchema>;