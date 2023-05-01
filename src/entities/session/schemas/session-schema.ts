import { z } from "zod";


export const sessionSchema = z.object({
  expiresAt: z.number(),
  user: z.object({
    id: z.string(),
    role: z.string(),
    email: z.string().email()
  }),
});

export type Session = z.input<typeof sessionSchema>;