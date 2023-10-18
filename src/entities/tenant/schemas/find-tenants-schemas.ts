import { findManyInputSchema, findManyResultSchema } from "@/shared/schemas";
import { z } from "zod";
import { tenantSchema } from "./tenant-schema";


export const findOneTenantInputSchema = z.union([
  tenantSchema.pick({ id: true }),
  tenantSchema.pick({ slug: true }),
  tenantSchema.pick({ name: true})
]);

export type FindOneTenantInput = z.input<typeof findOneTenantInputSchema>;

export const findOneTenantResultSchema = tenantSchema;

export type FindOneTenantResult = z.input<typeof findOneTenantResultSchema>;



export const findManyTenantsInputSchema = findManyInputSchema.extend({
  
});


export type FindManyTenantsInput = z.input<typeof findManyTenantsInputSchema>;


export const findManyTenantsResultSchema = findManyResultSchema.extend({
  data: z.array(tenantSchema)
});

export type FindManyTenantsResult = z.input<typeof findManyTenantsResultSchema>;