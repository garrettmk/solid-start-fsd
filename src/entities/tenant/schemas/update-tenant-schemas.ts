import { z } from "zod";
import { tenantSchema } from "./tenant-schema";
import { updateInputSchema, updateResultSchema } from "@/shared/schemas";

/**
 * Schema for the UpdateTenantInput
 */
export const updateTenantInputSchema = updateInputSchema.merge(tenantSchema.partial().pick({
  slug: true,
  name: true
}));

/**
 * Input type for updating a tenant
 */
export type UpdateTenantInput = z.input<typeof updateTenantInputSchema>;


/**
 * The schema for the result of updating a tenant.
 */
export const updateTenantResultSchema = updateResultSchema.merge(tenantSchema);


/**
 * The type of the result of updating a tenant.
 */
export type UpdateTenantResult = z.infer<typeof updateTenantResultSchema>;