import { z } from "zod";

/**
 * Base schema for update inputs
 */
export const updateInputSchema = z.object({
  id: z.string(),
});

/**
 * Base type for update inputs
 */
export type UpdateInput = z.infer<typeof updateInputSchema>;