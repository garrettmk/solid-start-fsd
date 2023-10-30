import { z } from "zod";

export const userSchema = z.object({
  id: z
    .string(),

  email: z
    .string()
    .email('Must be a valid email address'),

  createdAt: z
    .string()
    .datetime({ 
      offset: true,
      message: 'Must be a valid datetime string'
    }),
});

export type User = z.input<typeof userSchema>;