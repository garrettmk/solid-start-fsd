import { makeRouter, protectedProcedure } from "@/shared/server";
import { UserProfile, findManyUserProfilesInputSchema, findManyUserProfilesResultSchema, userProfileSchema } from "../schemas";
import { defaultPaginationInput } from "@/shared/schemas";
import { SupabaseDependency, camelizeObject, shakeNullValues } from "@/shared/lib";
import { snake } from "radash";

export const userProfilesRouter = makeRouter({
  findMany: protectedProcedure
    .input(findManyUserProfilesInputSchema.optional())
    .output(findManyUserProfilesResultSchema)
    .query(async ({ ctx, input }) => {
      const { search, sorting = [], pagination = defaultPaginationInput } = input ?? {};
      const supabase = await ctx.container.resolve(SupabaseDependency);

      // Include the total in the query
      const profilesQuery = supabase
        .from("user_profiles")
        .select('*', { count: 'exact' });

      // Apply keywords search
      if (search?.keywords)
        profilesQuery.filter('email', 'ilike', `%${search?.keywords}%`);

      // Apply sorting
      sorting.forEach(({ id, desc }) => {
        profilesQuery.order(snake(id), { ascending: !desc });
      });

      // Apply pagination
      profilesQuery.range(pagination.offset, pagination.offset + pagination.limit - 1);

      // Execute query
      const { data, count, error } = await profilesQuery;
      if (error) throw error;

      return {
        data: data
          .map(shakeNullValues)
          .map(camelizeObject<UserProfile>),
        paginated: {
          offset: Math.min(pagination?.offset ?? 0, count ?? 0),
          limit: pagination?.limit ?? 10,
          total: count ?? 0,
        },
        search: search ?? {},
        sorting: sorting ?? [],
      };
    }),
});