import { User, userSchema } from "@/entities/user"
import { SupabaseDependency, camelizeObject, pick } from "@/shared/lib"
import { makeRouter, protectedProcedure } from "@/shared/server"
import { z } from "zod"

export const usersViewRouter = makeRouter({
  viewUser: protectedProcedure
    .input(z.string())
    .output(userSchema)
    .query(async ({ ctx, input }) => {
      const supabase = await ctx.scope.resolve(SupabaseDependency);

      const { data, error } = await supabase
        .auth
        .admin
        .getUserById(input);

      if (error)
        throw error;

      if (!data?.user)
        throw new Error("User not found");

      return camelizeObject(pick(data.user, [
        "id",
        'email',
        'created_at'
      ])) as User;
    })
})