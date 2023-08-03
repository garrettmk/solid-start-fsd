import { useContainer } from "@/shared/ui";
import { createRouteAction } from "solid-start";
import { UserProfileUpdate } from "../schemas";
import { APIClientDependency } from "@/shared/lib";


export function useUserProfileUpdate() {
  const api = useContainer(APIClientDependency);

  return createRouteAction((data: UserProfileUpdate) => {
    return api.userProfiles.updateProfile.mutate(data);
  })
}