import { UserProfile, userProfileSchema } from "@/entities/user-profile";
import { SupabaseDependency, camelizeObject, shakeNullValues } from "@/shared/lib";
import { makeRouter, protectedProcedure } from "@/shared/server";
import { z } from "zod";

export const userProfileViewRouter = makeRouter({
  viewProfile: protectedProcedure
    .input(z.string())
    .output(userProfileSchema)
    .query(async ({ ctx, input }) => {
      const supabase = await ctx.scope.resolve(SupabaseDependency);
      
      const { data: userProfile, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", input)
        .single();

      if (error) {
        throw error;
      }

      if (!userProfile) {
        throw new Error("User profile not found");
      }

      return camelizeObject(shakeNullValues(userProfile)) as UserProfile;
    })
});