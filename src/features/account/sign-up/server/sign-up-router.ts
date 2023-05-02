import { makeRouter, publicProcedure } from "@/shared/server";
import { signUpInputSchema } from "../schemas";

export const signUpRouter = makeRouter({
  signUp: publicProcedure
    .input(signUpInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { account } = input;
      const { email, password, ...otherData } = account;

      return ctx.supabase.auth.signUp({
        email,
        password,
        options: { data: otherData }
      });
    })
});