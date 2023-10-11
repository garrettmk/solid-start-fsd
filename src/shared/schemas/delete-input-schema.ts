import { z } from "zod";

/**
 * Delete input schema
 */
export const deleteInputSchema = z.object({
  id: z.string()
});

export type DeleteInput = z.input<typeof deleteInputSchema>;