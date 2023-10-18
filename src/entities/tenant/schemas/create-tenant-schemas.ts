import { z } from 'zod';
import { tenantSchema } from "./tenant-schema";

/**
 * Validation schema for `CreateTenantInput`.
 */
export const createTenantInputSchema = tenantSchema.omit({
  id: true,
  createdAt: true
});

/**
 * Input for creating a tenant.
 */
export type CreateTenantInput = z.input<typeof createTenantInputSchema>;


/**
 * Validation schema for `CreateTenantResult`.
 */
export const createTenantResultSchema = tenantSchema;

/**
 * Result from creating a tenant.
 */
export type CreateTenantResult = z.input<typeof createTenantResultSchema>;