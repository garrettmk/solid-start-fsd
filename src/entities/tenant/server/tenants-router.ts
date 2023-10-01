import { SupabaseDependency, camelizeObject } from "@/shared/lib";
import { defaultPaginationInput, findManyInputSchema, findManyResultSchema } from "@/shared/schemas";
import { makeRouter, protectedProcedure } from "@/shared/server";
import { snake } from "radash";
import { Tenant, createTenantInputSchema, tenantSchema } from "../schemas";

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
    .input(findManyInputSchema)
    .output(findManyResultSchema)
    .query(async ({ ctx, input }) => {
      const { search, sorting = [], pagination = defaultPaginationInput } = input;
      const supabase = await ctx.scope.resolve(SupabaseDependency);

      // Include the total in the query
      const tenantsQuery = supabase
        .from("tenants")
        .select('*', { count: 'exact' });

      // Apply keywords search
      if (search?.keywords)
        tenantsQuery.textSearch("search_text", search?.keywords, { config: "english" });

      // Apply sorting
      sorting.forEach(({ id, desc }) => {
        tenantsQuery.order(snake(id), { ascending: !desc });
      });

      // Apply pagination
      tenantsQuery.range(pagination.offset, pagination.offset + pagination.limit - 1);

      // Execute query
      const { data, count, error } = await tenantsQuery;
      if (error) throw error;

      return {
        data: data.map(camelizeObject<Tenant>),
        paginated: {
          offset: Math.min(pagination?.offset ?? 0, count ?? 0),
          limit: pagination?.limit ?? 10,
          total: count ?? 0,
        },
        search: search ?? {},
        sorting: sorting ?? [],
      };
    })
});
