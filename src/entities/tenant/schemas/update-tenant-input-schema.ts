import { z } from "zod";
import { tenantSchema } from "./tenant-schema";
import { updateInputSchema } from "@/shared/schemas";

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