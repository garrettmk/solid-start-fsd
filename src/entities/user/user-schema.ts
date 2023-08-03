import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime({ offset: true }),
});

export type User = z.input<typeof userSchema>;