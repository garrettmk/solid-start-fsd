import { User, userSchema } from "./user-schema";
import { useContainer } from "@/shared/ui";
import { Resource } from "solid-js";
import { dependency } from "tidi";


export const SignedInUserDependency = dependency<Resource<User>>({
  name: 'SIGNED_IN_USER',
  validate: value => userSchema.optional().parse(value),
});


export function useSignedInUser() {
  return useContainer(SignedInUserDependency);
}
