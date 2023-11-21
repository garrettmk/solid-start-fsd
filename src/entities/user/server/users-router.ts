import { makeRouter, protectedProcedure } from "@/shared/server";
import { User, findManyUsersInputSchema, findManyUsersResultSchema, findOneUserInputSchema, findOneUserResultSchema } from "../schemas";
import { SupabaseDependency, camelizeObject } from "@/shared/lib";
import { defaultPaginationInput } from "@/shared/schemas";
import { snake } from "radash";

export const usersRouter = makeRouter({
  findOne: protectedProcedure
    .input(findOneUserInputSchema)
    .output(findOneUserResultSchema)
    .query(async ({ ctx, input }) => {
      const supabase = await ctx.container.resolve(SupabaseDependency);

      // Create the PostgREST filter
      const conditions = [
        'id' in input && `id.eq."${input.id}"`,
        'email' in input && `email.eq."${input.email}"`,
      ];

      const filter = conditions.filter(Boolean).join(', ');

      // Select the user
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .or(filter)
        .single();

      if (error)
        throw error;

      if (!data)
        throw new Error("User not found.");

      return camelizeObject<User>(data);
    }),

  findMany: protectedProcedure
    .input(findManyUsersInputSchema.optional())
    .output(findManyUsersResultSchema)
    .query(async ({ ctx, input }) => {
      const { search, sorting = [], pagination = defaultPaginationInput } = input ?? {};
      const supabase = await ctx.container.resolve(SupabaseDependency);

      // Include the total in the query
      const usersQuery = supabase
        .from("users")
        .select('*', { count: 'exact' });

      // Apply keywords search
      if (search?.keywords)
        usersQuery.filter('email', 'ilike', `%${search?.keywords}%`);

      // Apply sorting
      sorting.forEach(({ id, desc }) => {
        usersQuery.order(snake(id), { ascending: !desc });
      });

      // Apply pagination
      usersQuery.range(pagination.offset, pagination.offset + pagination.limit - 1);

      // Execute query
      const { data, count, error } = await usersQuery;
      if (error) throw error;

      console.log(data);

      return {
        data: data.map(camelizeObject<User>),
        paginated: {
          offset: Math.min(pagination?.offset ?? 0, count ?? 0),
          limit: pagination?.limit ?? 10,
          total: count ?? 0,
        },
        search: search ?? {},
        sorting: sorting ?? [],
      };
    })
})