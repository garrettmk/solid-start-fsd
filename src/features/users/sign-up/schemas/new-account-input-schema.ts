import { userSchema } from "@/entities/user";
import { userProfileSchema } from "@/entities/user-profile";
import { z } from "zod";

/**
 * A zod validation schema for a new account input.
 */
export const newAccountInputSchema = userSchema.pick({
  email: true
}).merge(userProfileSchema.pick({
  fullName: true,
  preferredName: true,
  avatarUrl: true
})).merge(z.object({
  password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be less than 30 characters")
      .regex(/^.*[a-z]+.*$/, "Must include at least one lowercase letter")
      .regex(/^.*[A-Z]+.*$/, "Must include at least one uppercase letter")
      .regex(/^.*[0-9]+.*$/, "Must include at least one number")
      .regex(
        /^.*[#?!@$%^&*@_^&*(){}[\]-]+.*$/,
        "Must include at least one special character (#?!@$%^&*-@_^&*(){}[])"
      ),

  confirmPassword: z
    .string(),
  
  agreesToTerms: z
    .boolean()
    .refine(v => v, { message: "Must agree to the terms and conditions" }),

  wantsMarketing: z
    .boolean()
    .optional(),
})).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password)
    ctx.addIssue({
      code: "custom",
      message: "Must match your password",
    });
});


/**
 * Input for creating a new account.
 */
export type NewAccountInput = z.input<typeof newAccountInputSchema>;
