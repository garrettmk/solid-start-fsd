import { z } from 'zod';

export const userProfileSchema = z.object({
  id: z.string(),
  fullName: z.string().min(3),
  preferredName: z.string().min(3),
  avatarUrl: z.string().url().optional(),
  avatarInitials: z.string().max(2).optional(),
  createdAt: z.string().datetime({ offset: true }),
  lastSignInAt: z.string().datetime({ offset: true }).optional(),
});

export type UserProfile = z.input<typeof userProfileSchema>;;