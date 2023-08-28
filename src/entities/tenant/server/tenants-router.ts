import { makeRouter, protectedProcedure } from "@/shared/server";
import { Tenant, createTenantInputSchema, tenantSchema } from "../schemas";
import { SupabaseDependency, camelizeObject } from "@/shared/lib";

export const tenantsRouter = makeRouter({
  create: protectedProcedure
    .input(createTenantInputSchema)
    .output(tenantSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, slug } = input;
      const supabase = await ctx.scope.resolve(SupabaseDependency);

      const { error: createError } = await supabase
        .from("tenants")
        .insert({
          name,
          slug
        });

      if (createError)
        throw createError;

      const { data, error: selectError } = await supabase
        .from("tenants")
        .select("*")
        .eq("slug", slug)
        .single();

      if (selectError)
        throw selectError;

      return camelizeObject<Tenant>(data);
    }),
});