import { updateResultSchema } from "@/shared/schemas";
import { tenantSchema } from "./tenant-schema";
import { z } from "zod";

/**
 * The schema for the result of updating a tenant.
 */
export const updateTenantResultSchema = updateResultSchema.merge(tenantSchema);

/**
 * The type of the result of updating a tenant.
 */
export type UpdateTenantResult = z.infer<typeof updateTenantResultSchema>;