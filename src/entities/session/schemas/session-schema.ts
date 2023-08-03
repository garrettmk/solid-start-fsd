import { z } from "zod";


export const sessionSchema = z.object({
  userId: z.string(),
  role: z.string(),
  expiresAt: z.number(),
});

export type Session = z.input<typeof sessionSchema>;