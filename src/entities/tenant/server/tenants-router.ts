import { makeRouter, protectedProcedure } from "@/shared/server";
import { Tenant, createTenantInputSchema, findManyTenantsInputSchema, tenantSchema } from "../schemas";
import { SupabaseDependency, camelizeObject } from "@/shared/lib";
import { paginatedTenantsSchema } from "../schemas";

export const tenantsRouter = makeRouter({

  /**
   * Creates a tenant.
   */
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

  /**
   * Finds many tenants.
   */
  findMany: protectedProcedure
    .input(findManyTenantsInputSchema)
    .output(paginatedTenantsSchema)
    .query(async ({ ctx, input }) => {
      const { keywords } = input;
      const supabase = await ctx.scope.resolve(SupabaseDependency);

      const { data, error } = await supabase
        .from("tenants")
        .select("*")
      .order("name", { ascending: true });

      if (error)
        throw error;

      return {
        data: data.map(camelizeObject<Tenant>),
        offset: 0,
        count: data.length,
        total: data.length
      };
    })
});