import { z } from "zod";
import { tenantSchema } from "./tenant-schema";

export const updateTenantInputSchema = tenantSchema.omit({
  id: true,
  createdAt: true
}).partial();

export type UpdateTenantInput = z.input<typeof updateTenantInputSchema>;