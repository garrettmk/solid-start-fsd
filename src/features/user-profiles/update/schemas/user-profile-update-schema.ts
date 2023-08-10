import { z } from 'zod';

export const MAX_FILE_SIZE = 1e6; // 1MB
export const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] as const;

export const userProfileUpdateSchemaBase = z.object({
  id: z
    .string()
    .uuid({ message: 'Invalid user ID' })
    .optional(),

  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters long' })
    .max(50, { message: 'Full name must be at most 50 characters long' })
    .regex(/^[a-zA-Z' \p{L}-]+$/, { message: 'Names can include any Unicode letter, hyphen, or apostrophe' })
    .optional(),

  preferredName: z
    .string()
    .min(3, { message: 'Preferred name must be at least 3 characters long' })
    .max(50, { message: 'Preferred name must be at most 50 characters long' })
    .regex(/^[a-zA-Z' \p{L}-]+$/, { message: 'Names can include any Unicode letter, hyphen, or apostrophe' })
    .optional(),

  avatarInitials: z
    .string()
    .regex(/^[a-zA-Z0-9]{2}$/, { message: 'Avatar initials must be exactly 2 letters' })
    .optional(),

  avatarImage: z
    .object({
      name: z.string(),
      size: z.number().max(MAX_FILE_SIZE, { message: `Image must be less than ${MAX_FILE_SIZE / 1e6}MB` }),
      type: z.enum(IMAGE_TYPES, { description: `Image must be one of the following types: ${IMAGE_TYPES.join(', ')}` }),
    })
    .optional(),

  avatarImageData: z.string().optional(),
});

export const userProfileUpdateSchema = userProfileUpdateSchemaBase.refine(
  ({ avatarImage, avatarImageData }) => avatarImage || avatarImageData ? avatarImage && avatarImageData : true,
);

export type UserProfileUpdate = z.infer<typeof userProfileUpdateSchema>;