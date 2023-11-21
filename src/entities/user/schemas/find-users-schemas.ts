import { z } from "zod";
import { userSchema } from "./user-schema";
import { findManyInputSchema, findManyResultSchema } from "@/shared/schemas";

export const findOneUserInputSchema = z.union([
  userSchema.pick({ id: true }),
  userSchema.pick({ email: true }),
]);

export type FindOneUserInput = z.input<typeof findOneUserInputSchema>;

export const findOneUserResultSchema = userSchema;

export type FindOneUserResult = z.input<typeof findOneUserResultSchema>;


export const findManyUsersInputSchema = findManyInputSchema.extend({

});

export type FindManyUsersInput = z.input<typeof findManyUsersInputSchema>;

export const findManyUsersResultSchema = findManyResultSchema.extend({
  data: z.array(userSchema)
});

export type FindManyUsersResult = z.input<typeof findManyUsersResultSchema>;