import { z } from "zod";

/**
 * Zod validation schema for `Sorting` objects. `Sorting` is used
 * to specify the sorting of a paginated request or response.
 */
export const sortingSchema = z.array(z.object({
  id: z.string(),
  desc: z.boolean()
}));

/**
 * Type of `Sorting` objects.
 */
export type Sorting = z.infer<typeof sortingSchema>;