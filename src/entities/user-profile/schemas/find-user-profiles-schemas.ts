import { findManyInputSchema, findManyResultSchema } from "@/shared/schemas";
import { z } from "zod";
import { userProfileSchema } from "./user-profile-schema";

export const findManyUserProfilesInputSchema = findManyInputSchema.extend({

});

export type FindManyUserProfilesInput = z.input<typeof findManyUserProfilesInputSchema>;

export const findManyUserProfilesResultSchema = findManyResultSchema.extend({
  data: z.array(userProfileSchema)
});

export type FindManyUserProfilesResult = z.input<typeof findManyUserProfilesResultSchema>;