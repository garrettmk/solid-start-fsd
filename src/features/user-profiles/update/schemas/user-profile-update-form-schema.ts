import { z } from "zod";
import { userProfileUpdateSchemaBase } from "./user-profile-update-schema";

export const userProfileUpdateFormSchema = userProfileUpdateSchemaBase
  .omit({ avatarImageData: true });

export type UserProfileUpdateFormData = z.infer<typeof userProfileUpdateFormSchema>;