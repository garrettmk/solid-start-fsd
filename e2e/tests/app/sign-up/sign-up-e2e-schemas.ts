import { z } from "zod";

export const newAccountInputSchema = z.object({
  email: z
    .string()
    .email(),

  fullName: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be no more than 30 characters")
    .regex(
      /^[a-zA-Z' \p{L}-]+$/,
      "Names can include any Unicode letter, hyphen, or apostrophe"
    ),
  
  preferredName: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be no more than 30 characters")
    .regex(
      /^[a-zA-Z' \p{L}-]+$/,
      "Names can include any Unicode letter, hyphen, or apostrophe"
    )
    .optional(),

  avatarUrl: z
    .string()
    .url('Must be a a valid URL')
    .optional(),
  
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
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password)
    ctx.addIssue({
      code: "custom",
      message: "Must match your password",
    });
});

export type NewAccountInput = z.input<typeof newAccountInputSchema>;