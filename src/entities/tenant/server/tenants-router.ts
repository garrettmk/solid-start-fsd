import { SupabaseDependency, camelizeObject } from "@/shared/lib";
import { defaultPaginationInput, deleteInputSchema, findManyInputSchema, findManyResultSchema } from "@/shared/schemas";
import { makeRouter, protectedProcedure } from "@/shared/server";
import { snake } from "radash";
import { Tenant, createTenantInputSchema, createTenantResultSchema, deleteTenantResultSchema, findOneTenantInputSchema, findOneTenantResultSchema, tenantSchema, updateTenantInputSchema, updateTenantResultSchema } from "../schemas";

export const tenantsRouter = makeRouter({

  /**
   * Creates a tenant.
   */
  create: protectedProcedure
    .input(createTenantInputSchema)
    .output(createTenantResultSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, slug } = input;
      const supabase = await ctx.container.resolve(SupabaseDependency);

      // Create the tenant
      const { error: createError } = await supabase
        .from("tenants")
        .insert({
          name,
          slug
        });

      if (createError)
        throw createError;

      // Select and return the tenant
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
   * Finds one tenant.
   */
  findOne: protectedProcedure
    .input(findOneTenantInputSchema)
    .output(findOneTenantResultSchema)
    .query(async ({ ctx, input }) => {
      const supabase = await ctx.container.resolve(SupabaseDependency);

      // Create the PostgREST filter
      const conditions = [
        'id' in input && `id.eq."${input.id}"`,
        'slug' in input && `slug.eq."${input.slug}"`,
        'name' in input && `name.eq."${input.name}"`,
      ];

      const filter = conditions.filter(Boolean).join(', ');
      console.log(filter);

      // Select the tenant
      const { data, error } = await supabase
        .from("tenants")
        .select("*")
        .or(filter)
        .single();

      if (error)
        throw error;

      if (!data)
        throw new Error(`Tenant not found`);

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
      const supabase = await ctx.container.resolve(SupabaseDependency);

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
    }),

    /**
     * Updates a tenant
     */
    update: protectedProcedure
      .input(updateTenantInputSchema)
      .output(updateTenantResultSchema)
      .mutation(async ({ ctx, input }) => {
        const { id, name, slug } = input;
        const supabase = await ctx.container.resolve(SupabaseDependency);

        // Update the tenant
        const { error: updateError } = await supabase
          .from("tenants")
          .update({
            name,
            slug
          })
          .eq("id", id);

        if (updateError)
          throw updateError;

        // Select and return the tenant
        const { data, error: findError } = await supabase
          .from("tenants")
          .select("*")
          .eq("id", id)
          .single();

        if (findError)
          throw findError;

        return camelizeObject<Tenant>(data);
      }),

    /**
     * Deletes a tenant.
     */
    delete: protectedProcedure
      .input(deleteInputSchema)
      .output(deleteTenantResultSchema)
      .mutation(async ({ ctx, input }) => {
        const { id } = input;
        const supabase = await ctx.container.resolve(SupabaseDependency);

        // Select the tenant
        const { data, error: findError } = await supabase
          .from("tenants")
          .select("*")
          .eq("id", id)
          .single();

        if (findError)
          throw findError;

        // Delete the tenant
        const { error } = await supabase
          .from("tenants")
          .delete()
          .eq("id", id)
          .single();

        if (error)
          throw error;

        // Return the previously selected tenant
        return camelizeObject<Tenant>(data);
      }),
});
