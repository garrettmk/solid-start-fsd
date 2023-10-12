import { z } from "zod";

/**
 * The base schema for an update result
 */
export const updateResultSchema = z.object({
  id: z.string(),
});

/**
 * The base type of an update result
 */
export type UpdateResult = z.infer<typeof updateResultSchema>;