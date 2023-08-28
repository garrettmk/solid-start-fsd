import { z } from "zod";

export const tenantSchema = z.object({
  id: z
    .string()
    .uuid(),

  slug: z
    .string()
    .regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, 'Can only contain lowercase letters, numbers, and hyphens'),

  name: z
    .string()
    .min(3, 'Must be at least 3 characters'),

  createdAt: z
    .string()
    .datetime({ offset: true })
});

export type Tenant = z.input<typeof tenantSchema>;