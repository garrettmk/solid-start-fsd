import { z } from "zod";
import { tenantSchema } from "./tenant-schema";

export const deleteTenantInputSchema = z.object({
  id: z.string()
});

export type DeleteTenantInput = z.infer<typeof deleteTenantInputSchema>;

export const deleteTenantResultSchema = tenantSchema;

export type DeleteTenantResult = z.infer<typeof deleteTenantResultSchema>;