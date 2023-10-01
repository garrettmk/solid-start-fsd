import { findManyInputSchema } from "@/shared/schemas";
import { z } from "zod";

export const findManyTenantsInputSchema = findManyInputSchema.extend({
  
});

export type FindManyTenantsInput = z.input<typeof findManyTenantsInputSchema>;