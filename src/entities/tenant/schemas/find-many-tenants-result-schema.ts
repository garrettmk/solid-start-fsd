import { findManyResultSchema } from "@/shared/schemas";
import { z } from "zod";
import { tenantSchema } from "./tenant-schema";

export const findManyTenantsResultSchema = findManyResultSchema.extend({
  data: z.array(tenantSchema)
});

export type FindManyTenantsResult = z.input<typeof findManyTenantsResultSchema>;