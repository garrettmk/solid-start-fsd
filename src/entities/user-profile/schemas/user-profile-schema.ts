import { z } from 'zod';

/**
 * A zod validation schema for a user profile.
 */
export const userProfileSchema = z.object({
  id: z.string(),

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

  avatarInitials: z
    .string()
    .max(2, 'Must be no more than 2 characters')
    .optional(),

  createdAt: z
    .string()
    .datetime({
      offset: true,
      message: 'Must be a valid datetime string'
    }),

  lastSignInAt: z
    .string()
    .datetime({ 
      offset: true, 
      message: 'Must be a valid datetime string'
    }).optional(),
});

/**
 * Profile information for a user.
 */
export type UserProfile = z.input<typeof userProfileSchema>;