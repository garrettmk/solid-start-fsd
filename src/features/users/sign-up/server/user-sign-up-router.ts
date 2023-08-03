import { makeRouter, publicProcedure } from "@/shared/server";
import { signUpInputSchema } from "../schemas";
import { SupabaseDependency } from "@/shared/lib";

export const userSignUpRouter = makeRouter({
  signUp: publicProcedure
    .input(signUpInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { account } = input;
      const { email, password, ...otherData } = account;
      const supabase = ctx.scope.get(SupabaseDependency)

      return supabase.auth.signUp({
        email,
        password,
        options: { data: otherData }
      });
    })
});