import { UserProfile, userProfileSchema } from "@/entities/user-profile";
import { SupabaseDependency, camelizeObject, shakeNullValues, snakeifyObject } from "@/shared/lib";
import { makeRouter, protectedProcedure } from "@/shared/server";
import { omit } from "radash";
import { userProfileUpdateSchema } from "../schemas";

export const userProfileUpdateRouter = makeRouter({
  updateProfile: protectedProcedure
    .input(userProfileUpdateSchema)
    .output(userProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const supabase = ctx.scope.get(SupabaseDependency);
      const databaseValues = snakeifyObject(omit(input, ["id", 'avatarImage', 'avatarImageData']));

      const { data: userProfile, error } = await supabase
        .from("user_profiles")
        .update(databaseValues)
        .eq("id", input.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return camelizeObject(shakeNullValues(userProfile)) as UserProfile;
    })
});