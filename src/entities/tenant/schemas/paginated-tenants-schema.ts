import { z } from "zod";
import { tenantSchema } from "./tenant-schema";
import { paginatedSchema } from "@/shared/schemas";

export const paginatedTenantsSchema = paginatedSchema.extend({
  data: z.array(tenantSchema)
});