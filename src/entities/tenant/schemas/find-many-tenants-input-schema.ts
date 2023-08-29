import { z } from "zod";

export const findManyTenantsInputSchema = z.object({
  keywords: z.string().optional(),
});

export type FindManyTenantsInput = z.input<typeof findManyTenantsInputSchema>;