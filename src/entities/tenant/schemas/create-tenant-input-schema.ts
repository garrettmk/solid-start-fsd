import { z } from 'zod';
import { tenantSchema } from "./tenant-schema";

export const createTenantInputSchema = tenantSchema.omit({
  id: true,
  createdAt: true
}).partial({
  slug: true
});

export type CreateTenantInput = z.input<typeof createTenantInputSchema>;