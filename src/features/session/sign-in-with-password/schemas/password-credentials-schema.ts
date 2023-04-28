import { z } from "zod";

export const passwordCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address")
    .email("Must be a valid email address"),

  password: z.string().min(1, "Please enter your password"),
});

export type PasswordCredentials = z.input<typeof passwordCredentialsSchema>;
